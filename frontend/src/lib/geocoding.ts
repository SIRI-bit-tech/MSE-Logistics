import { GRAPHHOPPER_API_KEY } from '../../constants'

export interface GeocodingResult {
  latitude: number
  longitude: number
}

/**
 * Normalize postal code format for ALL countries worldwide
 * @param postalCode Raw postal code
 * @param country Country name
 * @returns Normalized postal code
 */
function normalizePostalCode(postalCode: string, country: string): string {
  const cleanCode = postalCode.trim().toUpperCase()
  
  // Country-specific postal code formatting for ALL countries
  switch (country.toUpperCase()) {
    // North America
    case 'CANADA':
    case 'CA':
      return cleanCode.replace(/^([A-Z]\d[A-Z])\s*(\d[A-Z]\d)$/, '$1 $2')
    case 'UNITED STATES':
    case 'USA':
    case 'US':
      return cleanCode.replace(/^(\d{5})-?(\d{4})?$/, (match, zip, plus4) => 
        plus4 ? `${zip}-${plus4}` : zip
      )
    case 'MEXICO':
    case 'MX':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'GUATEMALA':
    case 'GT':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'EL SALVADOR':
    case 'SV':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    case 'HONDURAS':
    case 'HN':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'NICARAGUA':
    case 'NI':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'COSTA RICA':
    case 'CR':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'PANAMA':
    case 'PA':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    
    // Europe - ALL European countries
    case 'UNITED KINGDOM':
    case 'UK':
    case 'GB':
    case 'ENGLAND':
    case 'SCOTLAND':
    case 'WALES':
      return cleanCode.replace(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/, '$1 $2')
    case 'GERMANY':
    case 'DE':
    case 'FRANCE':
    case 'FR':
    case 'ITALY':
    case 'IT':
    case 'SPAIN':
    case 'ES':
    case 'FINLAND':
    case 'FI':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'NETHERLANDS':
    case 'NL':
      return cleanCode.replace(/^(\d{4})\s*([A-Z]{2})$/, '$1 $2')
    case 'BELGIUM':
    case 'BE':
    case 'SWITZERLAND':
    case 'CH':
    case 'AUSTRIA':
    case 'AT':
    case 'NORWAY':
    case 'NO':
    case 'DENMARK':
    case 'DK':
    case 'HUNGARY':
    case 'HU':
    case 'LUXEMBOURG':
    case 'LU':
    case 'SLOVENIA':
    case 'SI':
    case 'LATVIA':
    case 'LV':
    case 'BULGARIA':
    case 'BG':
    case 'NORTH MACEDONIA':
    case 'MK':
    case 'ALBANIA':
    case 'AL':
    case 'MOLDOVA':
    case 'MD':
    case 'CYPRUS':
    case 'CY':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    case 'SWEDEN':
    case 'SE':
      return cleanCode.replace(/^(\d{3})\s*(\d{2})$/, '$1 $2')
    case 'POLAND':
    case 'PL':
      return cleanCode.replace(/^(\d{2})\s*(\d{3})$/, '$1-$2')
    case 'PORTUGAL':
    case 'PT':
      return cleanCode.replace(/^(\d{4})\s*(\d{3})$/, '$1-$2')
    case 'IRELAND':
    case 'IE':
      return cleanCode.replace(/^([A-Z]\d{2})\s*([A-Z0-9]{4})$/, '$1 $2')
    case 'CZECH REPUBLIC':
    case 'CZ':
    case 'SLOVAKIA':
    case 'SK':
    case 'GREECE':
    case 'GR':
      return cleanCode.replace(/^(\d{3})\s*(\d{2})$/, '$1 $2')
    case 'ESTONIA':
    case 'EE':
    case 'LITHUANIA':
    case 'LT':
    case 'CROATIA':
    case 'HR':
    case 'UKRAINE':
    case 'UA':
    case 'SERBIA':
    case 'RS':
    case 'MONTENEGRO':
    case 'ME':
    case 'BOSNIA AND HERZEGOVINA':
    case 'BA':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'ROMANIA':
    case 'RO':
    case 'BELARUS':
    case 'BY':
    case 'RUSSIA':
    case 'RU':
    case 'RUSSIAN FEDERATION':
      return cleanCode.replace(/\D/g, '').substring(0, 6)
    case 'MALTA':
    case 'MT':
      return cleanCode.replace(/^([A-Z]{3})\s*(\d{4})$/, '$1 $2')
    case 'ICELAND':
    case 'IS':
      return cleanCode.replace(/\D/g, '').substring(0, 3)
    
    // Asia - ALL Asian countries
    case 'CHINA':
    case 'CN':
    case 'INDIA':
    case 'IN':
    case 'VIETNAM':
    case 'VN':
      return cleanCode.replace(/\D/g, '').substring(0, 6)
    case 'JAPAN':
    case 'JP':
      return cleanCode.replace(/^(\d{3})\s*(\d{4})$/, '$1-$2')
    case 'SOUTH KOREA':
    case 'KR':
    case 'KOREA':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'INDONESIA':
    case 'ID':
    case 'THAILAND':
    case 'TH':
    case 'MALAYSIA':
    case 'MY':
    case 'MYANMAR':
    case 'MM':
    case 'CAMBODIA':
    case 'KH':
    case 'LAOS':
    case 'LA':
    case 'MONGOLIA':
    case 'MN':
    case 'PAKISTAN':
    case 'PK':
    case 'SRI LANKA':
    case 'LK':
    case 'NEPAL':
    case 'NP':
    case 'BHUTAN':
    case 'BT':
    case 'MALDIVES':
    case 'MV':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'SINGAPORE':
    case 'SG':
      return cleanCode.replace(/\D/g, '').substring(0, 6)
    case 'PHILIPPINES':
    case 'PH':
    case 'BANGLADESH':
    case 'BD':
    case 'AFGHANISTAN':
    case 'AF':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    case 'BRUNEI':
    case 'BN':
      return cleanCode.replace(/^([A-Z]{2})(\d{4})$/, '$1$2')
    case 'TAIWAN':
    case 'TW':
      return cleanCode.replace(/^(\d{3})\s*(\d{2})?$/, (match, first, second) => 
        second ? `${first}-${second}` : first
      )
    case 'UZBEKISTAN':
    case 'UZ':
    case 'KAZAKHSTAN':
    case 'KZ':
    case 'KYRGYZSTAN':
    case 'KG':
    case 'TAJIKISTAN':
    case 'TJ':
    case 'TURKMENISTAN':
    case 'TM':
      return cleanCode.replace(/\D/g, '').substring(0, 6)
    
    // Middle East - ALL Middle Eastern countries
    case 'SAUDI ARABIA':
    case 'SA':
      return cleanCode.replace(/^(\d{5})\s*(\d{4})?$/, (match, first, second) => 
        second ? `${first}-${second}` : first
      )
    case 'KUWAIT':
    case 'KW':
    case 'IRAQ':
    case 'IQ':
    case 'TURKEY':
    case 'TR':
    case 'JORDAN':
    case 'JO':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'BAHRAIN':
    case 'BH':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    case 'OMAN':
    case 'OM':
      return cleanCode.replace(/\D/g, '').substring(0, 3)
    case 'IRAN':
    case 'IR':
      return cleanCode.replace(/\D/g, '').substring(0, 10)
    case 'ISRAEL':
    case 'IL':
      return cleanCode.replace(/\D/g, '').substring(0, 7)
    case 'LEBANON':
    case 'LB':
      return cleanCode.replace(/^(\d{4})\s*(\d{4})$/, '$1 $2')
    case 'GEORGIA':
    case 'GE':
    case 'ARMENIA':
    case 'AM':
    case 'AZERBAIJAN':
    case 'AZ':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    
    // Africa - ALL African countries
    case 'SOUTH AFRICA':
    case 'ZA':
    case 'TUNISIA':
    case 'TN':
    case 'ETHIOPIA':
    case 'ET':
    case 'MOZAMBIQUE':
    case 'MZ':
    case 'NIGER':
    case 'NE':
    case 'LIBERIA':
    case 'LR':
    case 'GUINEA-BISSAU':
    case 'GW':
    case 'CAPE VERDE':
    case 'CV':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    case 'EGYPT':
    case 'EG':
    case 'MOROCCO':
    case 'MA':
    case 'ALGERIA':
    case 'DZ':
    case 'SUDAN':
    case 'SD':
    case 'KENYA':
    case 'KE':
    case 'SENEGAL':
    case 'SN':
    case 'ZAMBIA':
    case 'ZM':
    case 'NAMIBIA':
    case 'NA':
    case 'MAURITIUS':
    case 'MU':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'NIGERIA':
    case 'NG':
      return cleanCode.replace(/\D/g, '').substring(0, 6)
    case 'MADAGASCAR':
    case 'MG':
    case 'GUINEA':
    case 'GN':
    case 'LESOTHO':
    case 'LS':
      return cleanCode.replace(/\D/g, '').substring(0, 3)
    case 'SOMALIA':
    case 'SO':
      return cleanCode.replace(/^([A-Z]{2})\s*(\d{5})$/, '$1 $2')
    case 'SWAZILAND':
    case 'SZ':
      return cleanCode.replace(/^([A-Z])(\d{3})$/, '$1$2')
    
    // South America - ALL South American countries
    case 'BRAZIL':
    case 'BR':
      return cleanCode.replace(/^(\d{5})\s*(\d{3})$/, '$1-$2')
    case 'ARGENTINA':
    case 'AR':
      return cleanCode.replace(/^([A-Z]?)(\d{4})([A-Z]{3})$/, '$1$2$3')
    case 'CHILE':
    case 'CL':
      return cleanCode.replace(/\D/g, '').substring(0, 7)
    case 'COLOMBIA':
    case 'CO':
    case 'ECUADOR':
    case 'EC':
      return cleanCode.replace(/\D/g, '').substring(0, 6)
    case 'PERU':
    case 'PE':
    case 'URUGUAY':
    case 'UY':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'VENEZUELA':
    case 'VE':
      return cleanCode.replace(/^(\d{4})\s*([A-Z])?$/, (match, num, letter) => 
        letter ? `${num}-${letter}` : num
      )
    case 'BOLIVIA':
    case 'BO':
    case 'PARAGUAY':
    case 'PY':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    case 'FRENCH GUIANA':
    case 'GF':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    
    // Oceania - ALL Oceanic countries
    case 'AUSTRALIA':
    case 'AU':
    case 'NEW ZEALAND':
    case 'NZ':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    case 'PAPUA NEW GUINEA':
    case 'PG':
      return cleanCode.replace(/\D/g, '').substring(0, 3)
    case 'PALAU':
    case 'PW':
    case 'MARSHALL ISLANDS':
    case 'MH':
    case 'MICRONESIA':
    case 'FM':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    
    // Caribbean - ALL Caribbean countries
    case 'CUBA':
    case 'CU':
    case 'DOMINICAN REPUBLIC':
    case 'DO':
      return cleanCode.replace(/\D/g, '').substring(0, 5)
    case 'HAITI':
    case 'HT':
      return cleanCode.replace(/\D/g, '').substring(0, 4)
    case 'PUERTO RICO':
    case 'PR':
      return cleanCode.replace(/^(\d{5})\s*(\d{4})?$/, (match, zip, plus4) => 
        plus4 ? `${zip}-${plus4}` : zip
      )
    case 'BARBADOS':
    case 'BB':
      return cleanCode.replace(/^([A-Z]{2})(\d{5})$/, '$1$2')
    
    default:
      return cleanCode
  }
}

/**
 * Get comprehensive country code mapping for all countries
 * @param country Country name
 * @returns ISO country code
 */
function getCountryCode(country: string): string {
  const countryMap: Record<string, string> = {
    // North America
    'UNITED STATES': 'US', 'USA': 'US',
    'CANADA': 'CA',
    'MEXICO': 'MX',
    'GUATEMALA': 'GT', 'BELIZE': 'BZ', 'EL SALVADOR': 'SV', 'HONDURAS': 'HN',
    'NICARAGUA': 'NI', 'COSTA RICA': 'CR', 'PANAMA': 'PA',
    
    // Europe
    'UNITED KINGDOM': 'GB', 'UK': 'GB', 'ENGLAND': 'GB', 'SCOTLAND': 'GB', 'WALES': 'GB',
    'GERMANY': 'DE', 'FRANCE': 'FR', 'ITALY': 'IT', 'SPAIN': 'ES', 'NETHERLANDS': 'NL',
    'BELGIUM': 'BE', 'SWITZERLAND': 'CH', 'AUSTRIA': 'AT', 'SWEDEN': 'SE', 'NORWAY': 'NO',
    'DENMARK': 'DK', 'FINLAND': 'FI', 'POLAND': 'PL', 'CZECH REPUBLIC': 'CZ',
    'HUNGARY': 'HU', 'PORTUGAL': 'PT', 'GREECE': 'GR', 'IRELAND': 'IE',
    'LUXEMBOURG': 'LU', 'SLOVENIA': 'SI', 'SLOVAKIA': 'SK', 'ESTONIA': 'EE',
    'LATVIA': 'LV', 'LITHUANIA': 'LT', 'CROATIA': 'HR', 'BULGARIA': 'BG',
    'ROMANIA': 'RO', 'MALTA': 'MT', 'CYPRUS': 'CY', 'ICELAND': 'IS',
    'SERBIA': 'RS', 'MONTENEGRO': 'ME', 'BOSNIA AND HERZEGOVINA': 'BA',
    'NORTH MACEDONIA': 'MK', 'ALBANIA': 'AL', 'MOLDOVA': 'MD', 'UKRAINE': 'UA',
    'BELARUS': 'BY', 'RUSSIA': 'RU', 'RUSSIAN FEDERATION': 'RU',
    
    // Asia
    'CHINA': 'CN', 'JAPAN': 'JP', 'SOUTH KOREA': 'KR', 'KOREA': 'KR',
    'INDIA': 'IN', 'INDONESIA': 'ID', 'THAILAND': 'TH', 'VIETNAM': 'VN',
    'PHILIPPINES': 'PH', 'MALAYSIA': 'MY', 'SINGAPORE': 'SG', 'MYANMAR': 'MM',
    'CAMBODIA': 'KH', 'LAOS': 'LA', 'BRUNEI': 'BN', 'TAIWAN': 'TW',
    'HONG KONG': 'HK', 'MACAU': 'MO', 'MONGOLIA': 'MN', 'NORTH KOREA': 'KP',
    'BANGLADESH': 'BD', 'PAKISTAN': 'PK', 'SRI LANKA': 'LK', 'NEPAL': 'NP',
    'BHUTAN': 'BT', 'MALDIVES': 'MV', 'AFGHANISTAN': 'AF', 'UZBEKISTAN': 'UZ',
    'KAZAKHSTAN': 'KZ', 'KYRGYZSTAN': 'KG', 'TAJIKISTAN': 'TJ', 'TURKMENISTAN': 'TM',
    
    // Middle East
    'SAUDI ARABIA': 'SA', 'UAE': 'AE', 'UNITED ARAB EMIRATES': 'AE',
    'QATAR': 'QA', 'KUWAIT': 'KW', 'BAHRAIN': 'BH', 'OMAN': 'OM',
    'YEMEN': 'YE', 'IRAQ': 'IQ', 'IRAN': 'IR', 'TURKEY': 'TR',
    'ISRAEL': 'IL', 'PALESTINE': 'PS', 'JORDAN': 'JO', 'LEBANON': 'LB',
    'SYRIA': 'SY', 'CYPRUS': 'CY', 'GEORGIA': 'GE', 'ARMENIA': 'AM',
    'AZERBAIJAN': 'AZ',
    
    // Africa
    'SOUTH AFRICA': 'ZA', 'EGYPT': 'EG', 'NIGERIA': 'NG', 'KENYA': 'KE',
    'GHANA': 'GH', 'MOROCCO': 'MA', 'TUNISIA': 'TN', 'ALGERIA': 'DZ',
    'LIBYA': 'LY', 'SUDAN': 'SD', 'ETHIOPIA': 'ET', 'UGANDA': 'UG',
    'TANZANIA': 'TZ', 'MOZAMBIQUE': 'MZ', 'MADAGASCAR': 'MG', 'CAMEROON': 'CM',
    'IVORY COAST': 'CI', 'BURKINA FASO': 'BF', 'MALI': 'ML', 'NIGER': 'NE',
    'CHAD': 'TD', 'SENEGAL': 'SN', 'GUINEA': 'GN', 'BENIN': 'BJ',
    'TOGO': 'TG', 'SIERRA LEONE': 'SL', 'LIBERIA': 'LR', 'MAURITANIA': 'MR',
    'GAMBIA': 'GM', 'GUINEA-BISSAU': 'GW', 'CAPE VERDE': 'CV', 'SAO TOME AND PRINCIPE': 'ST',
    'EQUATORIAL GUINEA': 'GQ', 'GABON': 'GA', 'REPUBLIC OF THE CONGO': 'CG',
    'DEMOCRATIC REPUBLIC OF THE CONGO': 'CD', 'CENTRAL AFRICAN REPUBLIC': 'CF',
    'RWANDA': 'RW', 'BURUNDI': 'BI', 'DJIBOUTI': 'DJ', 'SOMALIA': 'SO',
    'ERITREA': 'ER', 'SOUTH SUDAN': 'SS', 'ZAMBIA': 'ZM', 'ZIMBABWE': 'ZW',
    'BOTSWANA': 'BW', 'NAMIBIA': 'NA', 'LESOTHO': 'LS', 'SWAZILAND': 'SZ',
    'MALAWI': 'MW', 'ANGOLA': 'AO', 'COMOROS': 'KM', 'MAURITIUS': 'MU',
    'SEYCHELLES': 'SC',
    
    // South America
    'BRAZIL': 'BR', 'ARGENTINA': 'AR', 'CHILE': 'CL', 'COLOMBIA': 'CO',
    'PERU': 'PE', 'VENEZUELA': 'VE', 'ECUADOR': 'EC', 'BOLIVIA': 'BO',
    'PARAGUAY': 'PY', 'URUGUAY': 'UY', 'GUYANA': 'GY', 'SURINAME': 'SR',
    'FRENCH GUIANA': 'GF',
    
    // Oceania
    'AUSTRALIA': 'AU', 'NEW ZEALAND': 'NZ', 'FIJI': 'FJ', 'PAPUA NEW GUINEA': 'PG',
    'SOLOMON ISLANDS': 'SB', 'VANUATU': 'VU', 'SAMOA': 'WS', 'TONGA': 'TO',
    'KIRIBATI': 'KI', 'TUVALU': 'TV', 'NAURU': 'NR', 'PALAU': 'PW',
    'MARSHALL ISLANDS': 'MH', 'MICRONESIA': 'FM',
    
    // Caribbean
    'JAMAICA': 'JM', 'CUBA': 'CU', 'HAITI': 'HT', 'DOMINICAN REPUBLIC': 'DO',
    'PUERTO RICO': 'PR', 'TRINIDAD AND TOBAGO': 'TT', 'BARBADOS': 'BB',
    'BAHAMAS': 'BS', 'ANTIGUA AND BARBUDA': 'AG', 'SAINT LUCIA': 'LC',
    'GRENADA': 'GD', 'SAINT VINCENT AND THE GRENADINES': 'VC',
    'DOMINICA': 'DM', 'SAINT KITTS AND NEVIS': 'KN'
  }
  
  return countryMap[country.toUpperCase()] || country.toUpperCase()
}

/**
 * Enhanced geocoding with comprehensive country support - production ready
 * @param postalCode Postal/ZIP code
 * @param city City name
 * @param country Country name
 * @returns Coordinates or null if geocoding fails
 */
export async function geocodeByPostalCode(
  postalCode: string,
  city: string,
  country: string
): Promise<GeocodingResult | null> {
  if (!GRAPHHOPPER_API_KEY) {
    console.warn('GraphHopper API key not configured')
    return null
  }

  try {
    const normalizedPostal = normalizePostalCode(postalCode, country)
    const countryCode = getCountryCode(country)
    
    // Direct query with normalized postal code and country code
    const query = `${normalizedPostal}, ${city}, ${countryCode}`
    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(query)}&key=${GRAPHHOPPER_API_KEY}&limit=1`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      console.warn(`Geocoding failed for "${query}":`, response.statusText)
      return null
    }

    const data = await response.json()

    if (data.hits && data.hits.length > 0) {
      const hit = data.hits[0]
      
      return {
        latitude: hit.point.lat,
        longitude: hit.point.lng,
      }
    }

    console.warn('No geocoding results found for:', query)
    return null
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

/**
 * Geocode both sender and recipient addresses with comprehensive country support
 */
export async function geocodeShipmentAddresses(shipmentData: {
  senderPostalCode: string
  senderCity: string
  senderCountry: string
  recipientPostalCode: string
  recipientCity: string
  recipientCountry: string
}) {
  const [senderCoords, recipientCoords] = await Promise.all([
    geocodeByPostalCode(
      shipmentData.senderPostalCode,
      shipmentData.senderCity,
      shipmentData.senderCountry
    ),
    geocodeByPostalCode(
      shipmentData.recipientPostalCode,
      shipmentData.recipientCity,
      shipmentData.recipientCountry
    ),
  ])

  const result = {
    senderLatitude: senderCoords?.latitude ?? null,
    senderLongitude: senderCoords?.longitude ?? null,
    recipientLatitude: recipientCoords?.latitude ?? null,
    recipientLongitude: recipientCoords?.longitude ?? null,
  }

  return result
}
