import { Injectable, Logger } from "@nestjs/common"

interface ZoneInfo {
  zone: number
  region: string
  country: string
}

@Injectable()
export class ZoneService {
  private readonly logger = new Logger(ZoneService.name)

  // Zone mapping based on postal code patterns
  private readonly zoneMap = new Map<string, number>([
    // US Zones (based on first digit of ZIP)
    ['0', 1], ['1', 1], ['2', 2], ['3', 2], ['4', 3],
    ['5', 3], ['6', 4], ['7', 4], ['8', 5], ['9', 5],
    
    // International zones
    ['CA', 6], // Canada
    ['GB', 7], ['UK', 7], // United Kingdom
    ['DE', 8], ['FR', 8], ['IT', 8], ['ES', 8], ['NL', 8], // Western Europe
    ['AU', 9], ['NZ', 9], // Oceania
    ['JP', 10], ['CN', 10], ['KR', 10], // East Asia
  ])

  // Zone-based surcharge rates (in USD)
  private readonly surchargeRates = new Map<number, number>([
    [0, 0],    // Same zone
    [1, 5],    // Adjacent zone
    [2, 12],   // 2 zones apart
    [3, 20],   // 3 zones apart
    [4, 35],   // 4 zones apart
    [5, 50],   // 5+ zones apart (domestic)
    [6, 75],   // International - North America
    [7, 100],  // International - Europe
    [8, 125],  // International - Asia/Oceania
  ])

  /**
   * Calculate zone-based surcharge for shipping between two postal codes.
   * 
   * @param senderZip - Sender's postal code
   * @param recipientZip - Recipient's postal code  
   * @param senderCountry - Optional sender country hint (e.g., 'US', 'DE', 'CA', 'GB')
   * @param recipientCountry - Optional recipient country hint
   * @returns Promise<number> - Surcharge amount in USD
   * 
   * Note: Country hints help resolve ambiguous postal codes (e.g., German "01067" vs US "01067").
   * Without country hints, 5-digit codes starting with 0 are assumed to be German.
   */
  async getZoneSurcharge(
    senderZip: string, 
    recipientZip: string,
    senderCountry?: string,
    recipientCountry?: string
  ): Promise<number> {
    try {
      const senderZone = this.parsePostalCode(senderZip, senderCountry)
      const recipientZone = this.parsePostalCode(recipientZip, recipientCountry)
      
      const zoneDistance = this.calculateZoneDistance(senderZone, recipientZone)
      const surcharge = this.getZoneSurchargeRate(zoneDistance)

      this.logger.debug(
        `Zone surcharge calculated: ${senderZip} (Zone ${senderZone.zone}) -> ` +
        `${recipientZip} (Zone ${recipientZone.zone}) = $${surcharge}`
      )

      return surcharge
    } catch (error) {
      this.logger.error(
        `Failed to calculate zone surcharge for ${senderZip} -> ${recipientZip}:`,
        error
      )
      // Return base international rate as fallback
      return 50
    }
  }

  private parsePostalCode(postalCode: string, country?: string): ZoneInfo {
    const cleanCode = postalCode.trim().toUpperCase()
    
    // If country is explicitly provided, use country-specific parsing
    if (country) {
      const countryCode = country.toUpperCase()
      
      switch (countryCode) {
        case 'DE':
        case 'GERMANY':
          // German postal codes (5 digits, 01000-99999)
          if (/^\d{5}$/.test(cleanCode) && cleanCode >= '01000' && cleanCode <= '99999') {
            return {
              zone: this.zoneMap.get('DE') || 8,
              region: 'DE',
              country: 'Germany'
            }
          }
          break
          
        case 'US':
        case 'USA':
        case 'UNITED STATES':
          // US ZIP codes (5 or 9 digits)
          if (/^\d{5}(-\d{4})?$/.test(cleanCode)) {
            const firstDigit = cleanCode.charAt(0)
            const zone = this.zoneMap.get(firstDigit) || 3
            return {
              zone,
              region: 'US',
              country: 'United States'
            }
          }
          break
          
        case 'CA':
        case 'CANADA':
          // Canadian postal codes (A1A 1A1 format)
          if (/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/.test(cleanCode)) {
            return {
              zone: this.zoneMap.get('CA') || 6,
              region: 'CA',
              country: 'Canada'
            }
          }
          break
          
        case 'GB':
        case 'UK':
        case 'UNITED KINGDOM':
          // UK postal codes
          if (/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(cleanCode)) {
            return {
              zone: this.zoneMap.get('GB') || 7,
              region: 'GB',
              country: 'United Kingdom'
            }
          }
          break
      }
    }
    
    // Fallback to pattern-based detection (with improved ambiguity handling)
    // Note: 5-digit codes are ambiguous between US ZIP and German postal codes
    // We check German first for codes starting with 0 (common in German postcodes)
    
    // German postal codes (5 digits) - check first for codes starting with 0
    if (/^\d{5}$/.test(cleanCode) && cleanCode >= '01000' && cleanCode <= '99999') {
      // Prefer German interpretation for codes starting with 0 (01000-09999)
      // as US ZIP codes rarely start with 0 in practice
      if (cleanCode.startsWith('0')) {
        return {
          zone: this.zoneMap.get('DE') || 8,
          region: 'DE',
          country: 'Germany'
        }
      }
    }
    
    // US ZIP codes (5 or 9 digits)
    if (/^\d{5}(-\d{4})?$/.test(cleanCode)) {
      const firstDigit = cleanCode.charAt(0)
      const zone = this.zoneMap.get(firstDigit) || 3
      return {
        zone,
        region: 'US',
        country: 'United States'
      }
    }
    
    // Canadian postal codes (A1A 1A1 format)
    if (/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/.test(cleanCode)) {
      return {
        zone: this.zoneMap.get('CA') || 6,
        region: 'CA',
        country: 'Canada'
      }
    }
    
    // UK postal codes
    if (/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(cleanCode)) {
      return {
        zone: this.zoneMap.get('GB') || 7,
        region: 'GB',
        country: 'United Kingdom'
      }
    }
    
    // German postal codes (5 digits) - fallback for remaining German codes
    if (/^\d{5}$/.test(cleanCode) && cleanCode >= '01000' && cleanCode <= '99999') {
      return {
        zone: this.zoneMap.get('DE') || 8,
        region: 'DE',
        country: 'Germany'
      }
    }
    
    // Default to international zone for unrecognized formats
    return {
      zone: 10,
      region: 'INTL',
      country: 'International'
    }
  }

  private calculateZoneDistance(zone1: ZoneInfo, zone2: ZoneInfo): number {
    // Same country/region
    if (zone1.region === zone2.region) {
      return Math.abs(zone1.zone - zone2.zone)
    }
    
    // Different countries - use international rates
    if (zone1.region === 'US' || zone2.region === 'US') {
      const otherRegion = zone1.region === 'US' ? zone2.region : zone1.region
      
      switch (otherRegion) {
        case 'CA': return 6  // US-Canada
        case 'GB': case 'DE': case 'FR': case 'IT': case 'ES': case 'NL': 
          return 7  // US-Europe
        case 'AU': case 'NZ': case 'JP': case 'CN': case 'KR':
          return 8  // US-Asia/Oceania
        default: return 8    // US-Other International
      }
    }
    
    // International to international
    return 8
  }

  private getZoneSurchargeRate(distance: number): number {
    // Cap distance at 8 for rate lookup
    const cappedDistance = Math.min(distance, 8)
    return this.surchargeRates.get(cappedDistance) || 125
  }

  // Utility method to get zone info for debugging
  getZoneInfo(postalCode: string, country?: string): ZoneInfo {
    return this.parsePostalCode(postalCode, country)
  }

  // Get all available zones for reference
  getAvailableZones(): Array<{ region: string; zone: number; description: string }> {
    return [
      { region: 'US', zone: 1, description: 'US Northeast (0-1)' },
      { region: 'US', zone: 2, description: 'US Mid-Atlantic (2-3)' },
      { region: 'US', zone: 3, description: 'US Central (4-5)' },
      { region: 'US', zone: 4, description: 'US Mountain/Southwest (6-7)' },
      { region: 'US', zone: 5, description: 'US West Coast (8-9)' },
      { region: 'CA', zone: 6, description: 'Canada' },
      { region: 'GB', zone: 7, description: 'United Kingdom' },
      { region: 'DE', zone: 8, description: 'Western Europe' },
      { region: 'AU', zone: 9, description: 'Oceania' },
      { region: 'INTL', zone: 10, description: 'International' },
    ]
  }
}
