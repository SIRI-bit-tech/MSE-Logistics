import { Injectable } from "@nestjs/common"

@Injectable()
export class ZoneService {
  private readonly zoneSurcharges: Record<string, number> = {
    "US-CA": 0.05, // California surcharge
    "US-HI": 0.25, // Hawaii surcharge
    "US-AK": 0.3, // Alaska surcharge
  }

  async getZoneSurcharge(senderZip: string, recipientZip: string): Promise<number> {
    const senderZone = this.getZoneFromZip(senderZip)
    const recipientZone = this.getZoneFromZip(recipientZip)

    const senderSurcharge = this.zoneSurcharges[senderZone] || 0
    const recipientSurcharge = this.zoneSurcharges[recipientZone] || 0

    return (senderSurcharge + recipientSurcharge) / 2
  }

  private getZoneFromZip(zip: string): string {
    if (zip.startsWith("9")) return "US-CA"
    if (zip.startsWith("96")) return "US-HI"
    if (zip.startsWith("99")) return "US-AK"
    return "US-STANDARD"
  }
}
