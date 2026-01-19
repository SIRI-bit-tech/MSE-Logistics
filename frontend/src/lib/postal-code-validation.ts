/**
 * Postal code validation patterns for ALL countries worldwide
 */
const POSTAL_CODE_PATTERNS: Record<string, RegExp> = {
  // North America
  'UNITED STATES': /^\d{5}(-\d{4})?$/,
  'USA': /^\d{5}(-\d{4})?$/,
  'US': /^\d{5}(-\d{4})?$/,
  'CANADA': /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
  'CA': /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
  'MEXICO': /^\d{5}$/,
  'MX': /^\d{5}$/,
  'GUATEMALA': /^\d{5}$/,
  'GT': /^\d{5}$/,
  'BELIZE': /^.+$/, // No standard postal code
  'BZ': /^.+$/,
  'EL SALVADOR': /^\d{4}$/,
  'SV': /^\d{4}$/,
  'HONDURAS': /^\d{5}$/,
  'HN': /^\d{5}$/,
  'NICARAGUA': /^\d{5}$/,
  'NI': /^\d{5}$/,
  'COSTA RICA': /^\d{5}$/,
  'CR': /^\d{5}$/,
  'PANAMA': /^\d{4}$/,
  'PA': /^\d{4}$/,
  
  // Europe - ALL EU and European countries
  'UNITED KINGDOM': /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
  'UK': /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
  'GB': /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
  'ENGLAND': /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
  'SCOTLAND': /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
  'WALES': /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
  'GERMANY': /^\d{5}$/,
  'DE': /^\d{5}$/,
  'FRANCE': /^\d{5}$/,
  'FR': /^\d{5}$/,
  'ITALY': /^\d{5}$/,
  'IT': /^\d{5}$/,
  'SPAIN': /^\d{5}$/,
  'ES': /^\d{5}$/,
  'NETHERLANDS': /^\d{4}\s?[A-Z]{2}$/i,
  'NL': /^\d{4}\s?[A-Z]{2}$/i,
  'BELGIUM': /^\d{4}$/,
  'BE': /^\d{4}$/,
  'SWITZERLAND': /^\d{4}$/,
  'CH': /^\d{4}$/,
  'AUSTRIA': /^\d{4}$/,
  'AT': /^\d{4}$/,
  'SWEDEN': /^\d{3}\s?\d{2}$/,
  'SE': /^\d{3}\s?\d{2}$/,
  'NORWAY': /^\d{4}$/,
  'NO': /^\d{4}$/,
  'DENMARK': /^\d{4}$/,
  'DK': /^\d{4}$/,
  'FINLAND': /^\d{5}$/,
  'FI': /^\d{5}$/,
  'POLAND': /^\d{2}-\d{3}$/,
  'PL': /^\d{2}-\d{3}$/,
  'PORTUGAL': /^\d{4}-\d{3}$/,
  'PT': /^\d{4}-\d{3}$/,
  'IRELAND': /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i, // Eircode
  'IE': /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i,
  'CZECH REPUBLIC': /^\d{3}\s?\d{2}$/,
  'CZ': /^\d{3}\s?\d{2}$/,
  'HUNGARY': /^\d{4}$/,
  'HU': /^\d{4}$/,
  'GREECE': /^\d{3}\s?\d{2}$/,
  'GR': /^\d{3}\s?\d{2}$/,
  'LUXEMBOURG': /^\d{4}$/,
  'LU': /^\d{4}$/,
  'SLOVENIA': /^\d{4}$/,
  'SI': /^\d{4}$/,
  'SLOVAKIA': /^\d{3}\s?\d{2}$/,
  'SK': /^\d{3}\s?\d{2}$/,
  'ESTONIA': /^\d{5}$/,
  'EE': /^\d{5}$/,
  'LATVIA': /^\d{4}$/,
  'LV': /^\d{4}$/,
  'LITHUANIA': /^\d{5}$/,
  'LT': /^\d{5}$/,
  'CROATIA': /^\d{5}$/,
  'HR': /^\d{5}$/,
  'BULGARIA': /^\d{4}$/,
  'BG': /^\d{4}$/,
  'ROMANIA': /^\d{6}$/,
  'RO': /^\d{6}$/,
  'MALTA': /^[A-Z]{3}\s?\d{4}$/i,
  'MT': /^[A-Z]{3}\s?\d{4}$/i,
  'CYPRUS': /^\d{4}$/,
  'CY': /^\d{4}$/,
  'ICELAND': /^\d{3}$/,
  'IS': /^\d{3}$/,
  'SERBIA': /^\d{5}$/,
  'RS': /^\d{5}$/,
  'MONTENEGRO': /^\d{5}$/,
  'ME': /^\d{5}$/,
  'BOSNIA AND HERZEGOVINA': /^\d{5}$/,
  'BA': /^\d{5}$/,
  'NORTH MACEDONIA': /^\d{4}$/,
  'MK': /^\d{4}$/,
  'ALBANIA': /^\d{4}$/,
  'AL': /^\d{4}$/,
  'MOLDOVA': /^\d{4}$/,
  'MD': /^\d{4}$/,
  'UKRAINE': /^\d{5}$/,
  'UA': /^\d{5}$/,
  'BELARUS': /^\d{6}$/,
  'BY': /^\d{6}$/,
  'RUSSIA': /^\d{6}$/,
  'RU': /^\d{6}$/,
  'RUSSIAN FEDERATION': /^\d{6}$/,
  
  // Asia - ALL Asian countries
  'CHINA': /^\d{6}$/,
  'CN': /^\d{6}$/,
  'JAPAN': /^\d{3}-\d{4}$/,
  'JP': /^\d{3}-\d{4}$/,
  'SOUTH KOREA': /^\d{5}$/,
  'KR': /^\d{5}$/,
  'KOREA': /^\d{5}$/,
  'NORTH KOREA': /^.+$/, // No standard system
  'KP': /^.+$/,
  'INDIA': /^\d{6}$/,
  'IN': /^\d{6}$/,
  'INDONESIA': /^\d{5}$/,
  'ID': /^\d{5}$/,
  'THAILAND': /^\d{5}$/,
  'TH': /^\d{5}$/,
  'VIETNAM': /^\d{6}$/,
  'VN': /^\d{6}$/,
  'PHILIPPINES': /^\d{4}$/,
  'PH': /^\d{4}$/,
  'MALAYSIA': /^\d{5}$/,
  'MY': /^\d{5}$/,
  'SINGAPORE': /^\d{6}$/,
  'SG': /^\d{6}$/,
  'MYANMAR': /^\d{5}$/,
  'MM': /^\d{5}$/,
  'CAMBODIA': /^\d{5}$/,
  'KH': /^\d{5}$/,
  'LAOS': /^\d{5}$/,
  'LA': /^\d{5}$/,
  'BRUNEI': /^[A-Z]{2}\d{4}$/i,
  'BN': /^[A-Z]{2}\d{4}$/i,
  'TAIWAN': /^\d{3}(-\d{2})?$/,
  'TW': /^\d{3}(-\d{2})?$/,
  'HONG KONG': /^.+$/, // No postal codes
  'HK': /^.+$/,
  'MACAU': /^.+$/, // No postal codes
  'MO': /^.+$/,
  'MONGOLIA': /^\d{5}$/,
  'MN': /^\d{5}$/,
  'BANGLADESH': /^\d{4}$/,
  'BD': /^\d{4}$/,
  'PAKISTAN': /^\d{5}$/,
  'PK': /^\d{5}$/,
  'SRI LANKA': /^\d{5}$/,
  'LK': /^\d{5}$/,
  'NEPAL': /^\d{5}$/,
  'NP': /^\d{5}$/,
  'BHUTAN': /^\d{5}$/,
  'BT': /^\d{5}$/,
  'MALDIVES': /^\d{5}$/,
  'MV': /^\d{5}$/,
  'AFGHANISTAN': /^\d{4}$/,
  'AF': /^\d{4}$/,
  'UZBEKISTAN': /^\d{6}$/,
  'UZ': /^\d{6}$/,
  'KAZAKHSTAN': /^\d{6}$/,
  'KZ': /^\d{6}$/,
  'KYRGYZSTAN': /^\d{6}$/,
  'KG': /^\d{6}$/,
  'TAJIKISTAN': /^\d{6}$/,
  'TJ': /^\d{6}$/,
  'TURKMENISTAN': /^\d{6}$/,
  'TM': /^\d{6}$/,
  
  // Middle East - ALL Middle Eastern countries
  'SAUDI ARABIA': /^\d{5}(-\d{4})?$/,
  'SA': /^\d{5}(-\d{4})?$/,
  'UAE': /^.+$/, // No standard postal codes
  'AE': /^.+$/,
  'UNITED ARAB EMIRATES': /^.+$/,
  'QATAR': /^.+$/, // No postal codes
  'QA': /^.+$/,
  'KUWAIT': /^\d{5}$/,
  'KW': /^\d{5}$/,
  'BAHRAIN': /^\d{3,4}$/,
  'BH': /^\d{3,4}$/,
  'OMAN': /^\d{3}$/,
  'OM': /^\d{3}$/,
  'YEMEN': /^.+$/, // No standard system
  'YE': /^.+$/,
  'IRAQ': /^\d{5}$/,
  'IQ': /^\d{5}$/,
  'IRAN': /^\d{10}$/,
  'IR': /^\d{10}$/,
  'TURKEY': /^\d{5}$/,
  'TR': /^\d{5}$/,
  'ISRAEL': /^\d{5,7}$/,
  'IL': /^\d{5,7}$/,
  'PALESTINE': /^.+$/, // Uses Israeli system
  'PS': /^.+$/,
  'JORDAN': /^\d{5}$/,
  'JO': /^\d{5}$/,
  'LEBANON': /^\d{4}\s?\d{4}$/,
  'LB': /^\d{4}\s?\d{4}$/,
  'SYRIA': /^.+$/, // No standard system
  'SY': /^.+$/,
  'GEORGIA': /^\d{4}$/,
  'GE': /^\d{4}$/,
  'ARMENIA': /^\d{4}$/,
  'AM': /^\d{4}$/,
  'AZERBAIJAN': /^\d{4}$/,
  'AZ': /^\d{4}$/,
  
  // Africa - ALL African countries
  'SOUTH AFRICA': /^\d{4}$/,
  'ZA': /^\d{4}$/,
  'EGYPT': /^\d{5}$/,
  'EG': /^\d{5}$/,
  'NIGERIA': /^\d{6}$/,
  'NG': /^\d{6}$/,
  'KENYA': /^\d{5}$/,
  'KE': /^\d{5}$/,
  'GHANA': /^.+$/, // No postal codes
  'GH': /^.+$/,
  'MOROCCO': /^\d{5}$/,
  'MA': /^\d{5}$/,
  'TUNISIA': /^\d{4}$/,
  'TN': /^\d{4}$/,
  'ALGERIA': /^\d{5}$/,
  'DZ': /^\d{5}$/,
  'LIBYA': /^.+$/, // No standard system
  'LY': /^.+$/,
  'SUDAN': /^\d{5}$/,
  'SD': /^\d{5}$/,
  'ETHIOPIA': /^\d{4}$/,
  'ET': /^\d{4}$/,
  'UGANDA': /^.+$/, // No postal codes
  'UG': /^.+$/,
  'TANZANIA': /^.+$/, // No postal codes
  'TZ': /^.+$/,
  'MOZAMBIQUE': /^\d{4}$/,
  'MZ': /^\d{4}$/,
  'MADAGASCAR': /^\d{3}$/,
  'MG': /^\d{3}$/,
  'CAMEROON': /^.+$/, // No postal codes
  'CM': /^.+$/,
  'IVORY COAST': /^.+$/, // No postal codes
  'CI': /^.+$/,
  'BURKINA FASO': /^.+$/, // No postal codes
  'BF': /^.+$/,
  'MALI': /^.+$/, // No postal codes
  'ML': /^.+$/,
  'NIGER': /^\d{4}$/,
  'NE': /^\d{4}$/,
  'CHAD': /^.+$/, // No postal codes
  'TD': /^.+$/,
  'SENEGAL': /^\d{5}$/,
  'SN': /^\d{5}$/,
  'GUINEA': /^\d{3}$/,
  'GN': /^\d{3}$/,
  'BENIN': /^.+$/, // No postal codes
  'BJ': /^.+$/,
  'TOGO': /^.+$/, // No postal codes
  'TG': /^.+$/,
  'SIERRA LEONE': /^.+$/, // No postal codes
  'SL': /^.+$/,
  'LIBERIA': /^\d{4}$/,
  'LR': /^\d{4}$/,
  'MAURITANIA': /^.+$/, // No postal codes
  'MR': /^.+$/,
  'GAMBIA': /^.+$/, // No postal codes
  'GM': /^.+$/,
  'GUINEA-BISSAU': /^\d{4}$/,
  'GW': /^\d{4}$/,
  'CAPE VERDE': /^\d{4}$/,
  'CV': /^\d{4}$/,
  'SAO TOME AND PRINCIPE': /^.+$/, // No postal codes
  'ST': /^.+$/,
  'EQUATORIAL GUINEA': /^.+$/, // No postal codes
  'GQ': /^.+$/,
  'GABON': /^.+$/, // No postal codes
  'GA': /^.+$/,
  'REPUBLIC OF THE CONGO': /^.+$/, // No postal codes
  'CG': /^.+$/,
  'DEMOCRATIC REPUBLIC OF THE CONGO': /^.+$/, // No postal codes
  'CD': /^.+$/,
  'CENTRAL AFRICAN REPUBLIC': /^.+$/, // No postal codes
  'CF': /^.+$/,
  'RWANDA': /^.+$/, // No postal codes
  'RW': /^.+$/,
  'BURUNDI': /^.+$/, // No postal codes
  'BI': /^.+$/,
  'DJIBOUTI': /^.+$/, // No postal codes
  'DJ': /^.+$/,
  'SOMALIA': /^[A-Z]{2}\s?\d{5}$/i,
  'SO': /^[A-Z]{2}\s?\d{5}$/i,
  'ERITREA': /^.+$/, // No postal codes
  'ER': /^.+$/,
  'SOUTH SUDAN': /^.+$/, // No postal codes
  'SS': /^.+$/,
  'ZAMBIA': /^\d{5}$/,
  'ZM': /^\d{5}$/,
  'ZIMBABWE': /^.+$/, // No postal codes
  'ZW': /^.+$/,
  'BOTSWANA': /^.+$/, // No postal codes
  'BW': /^.+$/,
  'NAMIBIA': /^\d{5}$/,
  'NA': /^\d{5}$/,
  'LESOTHO': /^\d{3}$/,
  'LS': /^\d{3}$/,
  'SWAZILAND': /^[A-Z]\d{3}$/i,
  'SZ': /^[A-Z]\d{3}$/i,
  'MALAWI': /^.+$/, // No postal codes
  'MW': /^.+$/,
  'ANGOLA': /^.+$/, // No postal codes
  'AO': /^.+$/,
  'COMOROS': /^.+$/, // No postal codes
  'KM': /^.+$/,
  'MAURITIUS': /^\d{5}$/,
  'MU': /^\d{5}$/,
  'SEYCHELLES': /^.+$/, // No postal codes
  'SC': /^.+$/,
  
  // South America - ALL South American countries
  'BRAZIL': /^\d{5}-\d{3}$/,
  'BR': /^\d{5}-\d{3}$/,
  'ARGENTINA': /^[A-Z]?\d{4}[A-Z]{3}$/i,
  'AR': /^[A-Z]?\d{4}[A-Z]{3}$/i,
  'CHILE': /^\d{7}$/,
  'CL': /^\d{7}$/,
  'COLOMBIA': /^\d{6}$/,
  'CO': /^\d{6}$/,
  'PERU': /^\d{5}$/,
  'PE': /^\d{5}$/,
  'VENEZUELA': /^\d{4}(-[A-Z])?$/i,
  'VE': /^\d{4}(-[A-Z])?$/i,
  'ECUADOR': /^\d{6}$/,
  'EC': /^\d{6}$/,
  'BOLIVIA': /^\d{4}$/,
  'BO': /^\d{4}$/,
  'PARAGUAY': /^\d{4}$/,
  'PY': /^\d{4}$/,
  'URUGUAY': /^\d{5}$/,
  'UY': /^\d{5}$/,
  'GUYANA': /^.+$/, // No postal codes
  'GY': /^.+$/,
  'SURINAME': /^.+$/, // No postal codes
  'SR': /^.+$/,
  'FRENCH GUIANA': /^\d{5}$/,
  'GF': /^\d{5}$/,
  
  // Oceania - ALL Oceanic countries
  'AUSTRALIA': /^\d{4}$/,
  'AU': /^\d{4}$/,
  'NEW ZEALAND': /^\d{4}$/,
  'NZ': /^\d{4}$/,
  'FIJI': /^.+$/, // No postal codes
  'FJ': /^.+$/,
  'PAPUA NEW GUINEA': /^\d{3}$/,
  'PG': /^\d{3}$/,
  'SOLOMON ISLANDS': /^.+$/, // No postal codes
  'SB': /^.+$/,
  'VANUATU': /^.+$/, // No postal codes
  'VU': /^.+$/,
  'SAMOA': /^.+$/, // No postal codes
  'WS': /^.+$/,
  'TONGA': /^.+$/, // No postal codes
  'TO': /^.+$/,
  'KIRIBATI': /^.+$/, // No postal codes
  'KI': /^.+$/,
  'TUVALU': /^.+$/, // No postal codes
  'TV': /^.+$/,
  'NAURU': /^.+$/, // No postal codes
  'NR': /^.+$/,
  'PALAU': /^\d{5}$/,
  'PW': /^\d{5}$/,
  'MARSHALL ISLANDS': /^\d{5}$/,
  'MH': /^\d{5}$/,
  'MICRONESIA': /^\d{5}$/,
  'FM': /^\d{5}$/,
  
  // Caribbean - ALL Caribbean countries
  'JAMAICA': /^.+$/, // No postal codes
  'JM': /^.+$/,
  'CUBA': /^\d{5}$/,
  'CU': /^\d{5}$/,
  'HAITI': /^\d{4}$/,
  'HT': /^\d{4}$/,
  'DOMINICAN REPUBLIC': /^\d{5}$/,
  'DO': /^\d{5}$/,
  'PUERTO RICO': /^\d{5}(-\d{4})?$/,
  'PR': /^\d{5}(-\d{4})?$/,
  'TRINIDAD AND TOBAGO': /^.+$/, // No postal codes
  'TT': /^.+$/,
  'BARBADOS': /^[A-Z]{2}\d{5}$/i,
  'BB': /^[A-Z]{2}\d{5}$/i,
  'BAHAMAS': /^.+$/, // No postal codes
  'BS': /^.+$/,
  'ANTIGUA AND BARBUDA': /^.+$/, // No postal codes
  'AG': /^.+$/,
  'SAINT LUCIA': /^.+$/, // No postal codes
  'LC': /^.+$/,
  'GRENADA': /^.+$/, // No postal codes
  'GD': /^.+$/,
  'SAINT VINCENT AND THE GRENADINES': /^.+$/, // No postal codes
  'VC': /^.+$/,
  'DOMINICA': /^.+$/, // No postal codes
  'DM': /^.+$/,
  'SAINT KITTS AND NEVIS': /^.+$/, // No postal codes
  'KN': /^.+$/,
}

/**
 * Postal code format examples for ALL countries worldwide
 */
const POSTAL_CODE_EXAMPLES: Record<string, string> = {
  // North America
  'UNITED STATES': '12345 or 12345-6789',
  'USA': '12345 or 12345-6789',
  'US': '12345 or 12345-6789',
  'CANADA': 'A1A 1A1',
  'CA': 'A1A 1A1',
  'MEXICO': '12345',
  'MX': '12345',
  'GUATEMALA': '12345',
  'GT': '12345',
  'BELIZE': 'No postal code',
  'BZ': 'No postal code',
  'EL SALVADOR': '1234',
  'SV': '1234',
  'HONDURAS': '12345',
  'HN': '12345',
  'NICARAGUA': '12345',
  'NI': '12345',
  'COSTA RICA': '12345',
  'CR': '12345',
  'PANAMA': '1234',
  'PA': '1234',
  
  // Europe
  'UNITED KINGDOM': 'SW1A 1AA or M1 1AA',
  'UK': 'SW1A 1AA or M1 1AA',
  'GB': 'SW1A 1AA or M1 1AA',
  'ENGLAND': 'SW1A 1AA or M1 1AA',
  'SCOTLAND': 'SW1A 1AA or M1 1AA',
  'WALES': 'SW1A 1AA or M1 1AA',
  'GERMANY': '12345',
  'DE': '12345',
  'FRANCE': '75001',
  'FR': '75001',
  'ITALY': '00118',
  'IT': '00118',
  'SPAIN': '28001',
  'ES': '28001',
  'NETHERLANDS': '1234 AB',
  'NL': '1234 AB',
  'BELGIUM': '1000',
  'BE': '1000',
  'SWITZERLAND': '8001',
  'CH': '8001',
  'AUSTRIA': '1010',
  'AT': '1010',
  'SWEDEN': '123 45',
  'SE': '123 45',
  'NORWAY': '0001',
  'NO': '0001',
  'DENMARK': '1000',
  'DK': '1000',
  'FINLAND': '00100',
  'FI': '00100',
  'POLAND': '00-001',
  'PL': '00-001',
  'PORTUGAL': '1000-001',
  'PT': '1000-001',
  'IRELAND': 'A12 B345',
  'IE': 'A12 B345',
  'CZECH REPUBLIC': '123 45',
  'CZ': '123 45',
  'HUNGARY': '1234',
  'HU': '1234',
  'GREECE': '123 45',
  'GR': '123 45',
  'LUXEMBOURG': '1234',
  'LU': '1234',
  'SLOVENIA': '1234',
  'SI': '1234',
  'SLOVAKIA': '123 45',
  'SK': '123 45',
  'ESTONIA': '12345',
  'EE': '12345',
  'LATVIA': '1234',
  'LV': '1234',
  'LITHUANIA': '12345',
  'LT': '12345',
  'CROATIA': '12345',
  'HR': '12345',
  'BULGARIA': '1234',
  'BG': '1234',
  'ROMANIA': '123456',
  'RO': '123456',
  'MALTA': 'ABC 1234',
  'MT': 'ABC 1234',
  'CYPRUS': '1234',
  'CY': '1234',
  'ICELAND': '123',
  'IS': '123',
  'SERBIA': '12345',
  'RS': '12345',
  'MONTENEGRO': '12345',
  'ME': '12345',
  'BOSNIA AND HERZEGOVINA': '12345',
  'BA': '12345',
  'NORTH MACEDONIA': '1234',
  'MK': '1234',
  'ALBANIA': '1234',
  'AL': '1234',
  'MOLDOVA': '1234',
  'MD': '1234',
  'UKRAINE': '12345',
  'UA': '12345',
  'BELARUS': '123456',
  'BY': '123456',
  'RUSSIA': '123456',
  'RU': '123456',
  'RUSSIAN FEDERATION': '123456',
  
  // Asia
  'CHINA': '123456',
  'CN': '123456',
  'JAPAN': '123-4567',
  'JP': '123-4567',
  'SOUTH KOREA': '12345',
  'KR': '12345',
  'KOREA': '12345',
  'NORTH KOREA': 'No standard system',
  'KP': 'No standard system',
  'INDIA': '123456',
  'IN': '123456',
  'INDONESIA': '12345',
  'ID': '12345',
  'THAILAND': '12345',
  'TH': '12345',
  'VIETNAM': '123456',
  'VN': '123456',
  'PHILIPPINES': '1234',
  'PH': '1234',
  'MALAYSIA': '12345',
  'MY': '12345',
  'SINGAPORE': '123456',
  'SG': '123456',
  'MYANMAR': '12345',
  'MM': '12345',
  'CAMBODIA': '12345',
  'KH': '12345',
  'LAOS': '12345',
  'LA': '12345',
  'BRUNEI': 'AB1234',
  'BN': 'AB1234',
  'TAIWAN': '123 or 123-45',
  'TW': '123 or 123-45',
  'HONG KONG': 'No postal codes',
  'HK': 'No postal codes',
  'MACAU': 'No postal codes',
  'MO': 'No postal codes',
  'MONGOLIA': '12345',
  'MN': '12345',
  'BANGLADESH': '1234',
  'BD': '1234',
  'PAKISTAN': '12345',
  'PK': '12345',
  'SRI LANKA': '12345',
  'LK': '12345',
  'NEPAL': '12345',
  'NP': '12345',
  'BHUTAN': '12345',
  'BT': '12345',
  'MALDIVES': '12345',
  'MV': '12345',
  'AFGHANISTAN': '1234',
  'AF': '1234',
  'UZBEKISTAN': '123456',
  'UZ': '123456',
  'KAZAKHSTAN': '123456',
  'KZ': '123456',
  'KYRGYZSTAN': '123456',
  'KG': '123456',
  'TAJIKISTAN': '123456',
  'TJ': '123456',
  'TURKMENISTAN': '123456',
  'TM': '123456',
  
  // Middle East
  'SAUDI ARABIA': '12345 or 12345-1234',
  'SA': '12345 or 12345-1234',
  'UAE': 'No postal codes',
  'AE': 'No postal codes',
  'UNITED ARAB EMIRATES': 'No postal codes',
  'QATAR': 'No postal codes',
  'QA': 'No postal codes',
  'KUWAIT': '12345',
  'KW': '12345',
  'BAHRAIN': '123 or 1234',
  'BH': '123 or 1234',
  'OMAN': '123',
  'OM': '123',
  'YEMEN': 'No standard system',
  'YE': 'No standard system',
  'IRAQ': '12345',
  'IQ': '12345',
  'IRAN': '1234567890',
  'IR': '1234567890',
  'TURKEY': '12345',
  'TR': '12345',
  'ISRAEL': '12345 or 1234567',
  'IL': '12345 or 1234567',
  'PALESTINE': 'Uses Israeli system',
  'PS': 'Uses Israeli system',
  'JORDAN': '12345',
  'JO': '12345',
  'LEBANON': '1234 5678',
  'LB': '1234 5678',
  'SYRIA': 'No standard system',
  'SY': 'No standard system',
  'GEORGIA': '1234',
  'GE': '1234',
  'ARMENIA': '1234',
  'AM': '1234',
  'AZERBAIJAN': '1234',
  'AZ': '1234',
  
  // Africa
  'SOUTH AFRICA': '1234',
  'ZA': '1234',
  'EGYPT': '12345',
  'EG': '12345',
  'NIGERIA': '123456',
  'NG': '123456',
  'KENYA': '12345',
  'KE': '12345',
  'GHANA': 'No postal codes',
  'GH': 'No postal codes',
  'MOROCCO': '12345',
  'MA': '12345',
  'TUNISIA': '1234',
  'TN': '1234',
  'ALGERIA': '12345',
  'DZ': '12345',
  'LIBYA': 'No standard system',
  'LY': 'No standard system',
  'SUDAN': '12345',
  'SD': '12345',
  'ETHIOPIA': '1234',
  'ET': '1234',
  'UGANDA': 'No postal codes',
  'UG': 'No postal codes',
  'TANZANIA': 'No postal codes',
  'TZ': 'No postal codes',
  'MOZAMBIQUE': '1234',
  'MZ': '1234',
  'MADAGASCAR': '123',
  'MG': '123',
  'CAMEROON': 'No postal codes',
  'CM': 'No postal codes',
  'IVORY COAST': 'No postal codes',
  'CI': 'No postal codes',
  'BURKINA FASO': 'No postal codes',
  'BF': 'No postal codes',
  'MALI': 'No postal codes',
  'ML': 'No postal codes',
  'NIGER': '1234',
  'NE': '1234',
  'CHAD': 'No postal codes',
  'TD': 'No postal codes',
  'SENEGAL': '12345',
  'SN': '12345',
  'GUINEA': '123',
  'GN': '123',
  'BENIN': 'No postal codes',
  'BJ': 'No postal codes',
  'TOGO': 'No postal codes',
  'TG': 'No postal codes',
  'SIERRA LEONE': 'No postal codes',
  'SL': 'No postal codes',
  'LIBERIA': '1234',
  'LR': '1234',
  'MAURITANIA': 'No postal codes',
  'MR': 'No postal codes',
  'GAMBIA': 'No postal codes',
  'GM': 'No postal codes',
  'GUINEA-BISSAU': '1234',
  'GW': '1234',
  'CAPE VERDE': '1234',
  'CV': '1234',
  'SAO TOME AND PRINCIPE': 'No postal codes',
  'ST': 'No postal codes',
  'EQUATORIAL GUINEA': 'No postal codes',
  'GQ': 'No postal codes',
  'GABON': 'No postal codes',
  'GA': 'No postal codes',
  'REPUBLIC OF THE CONGO': 'No postal codes',
  'CG': 'No postal codes',
  'DEMOCRATIC REPUBLIC OF THE CONGO': 'No postal codes',
  'CD': 'No postal codes',
  'CENTRAL AFRICAN REPUBLIC': 'No postal codes',
  'CF': 'No postal codes',
  'RWANDA': 'No postal codes',
  'RW': 'No postal codes',
  'BURUNDI': 'No postal codes',
  'BI': 'No postal codes',
  'DJIBOUTI': 'No postal codes',
  'DJ': 'No postal codes',
  'SOMALIA': 'AB 12345',
  'SO': 'AB 12345',
  'ERITREA': 'No postal codes',
  'ER': 'No postal codes',
  'SOUTH SUDAN': 'No postal codes',
  'SS': 'No postal codes',
  'ZAMBIA': '12345',
  'ZM': '12345',
  'ZIMBABWE': 'No postal codes',
  'ZW': 'No postal codes',
  'BOTSWANA': 'No postal codes',
  'BW': 'No postal codes',
  'NAMIBIA': '12345',
  'NA': '12345',
  'LESOTHO': '123',
  'LS': '123',
  'SWAZILAND': 'A123',
  'SZ': 'A123',
  'MALAWI': 'No postal codes',
  'MW': 'No postal codes',
  'ANGOLA': 'No postal codes',
  'AO': 'No postal codes',
  'COMOROS': 'No postal codes',
  'KM': 'No postal codes',
  'MAURITIUS': '12345',
  'MU': '12345',
  'SEYCHELLES': 'No postal codes',
  'SC': 'No postal codes',
  
  // South America
  'BRAZIL': '12345-678',
  'BR': '12345-678',
  'ARGENTINA': 'A1234ABC or 1234ABC',
  'AR': 'A1234ABC or 1234ABC',
  'CHILE': '1234567',
  'CL': '1234567',
  'COLOMBIA': '123456',
  'CO': '123456',
  'PERU': '12345',
  'PE': '12345',
  'VENEZUELA': '1234 or 1234-A',
  'VE': '1234 or 1234-A',
  'ECUADOR': '123456',
  'EC': '123456',
  'BOLIVIA': '1234',
  'BO': '1234',
  'PARAGUAY': '1234',
  'PY': '1234',
  'URUGUAY': '12345',
  'UY': '12345',
  'GUYANA': 'No postal codes',
  'GY': 'No postal codes',
  'SURINAME': 'No postal codes',
  'SR': 'No postal codes',
  'FRENCH GUIANA': '12345',
  'GF': '12345',
  
  // Oceania
  'AUSTRALIA': '1234',
  'AU': '1234',
  'NEW ZEALAND': '1234',
  'NZ': '1234',
  'FIJI': 'No postal codes',
  'FJ': 'No postal codes',
  'PAPUA NEW GUINEA': '123',
  'PG': '123',
  'SOLOMON ISLANDS': 'No postal codes',
  'SB': 'No postal codes',
  'VANUATU': 'No postal codes',
  'VU': 'No postal codes',
  'SAMOA': 'No postal codes',
  'WS': 'No postal codes',
  'TONGA': 'No postal codes',
  'TO': 'No postal codes',
  'KIRIBATI': 'No postal codes',
  'KI': 'No postal codes',
  'TUVALU': 'No postal codes',
  'TV': 'No postal codes',
  'NAURU': 'No postal codes',
  'NR': 'No postal codes',
  'PALAU': '12345',
  'PW': '12345',
  'MARSHALL ISLANDS': '12345',
  'MH': '12345',
  'MICRONESIA': '12345',
  'FM': '12345',
  
  // Caribbean
  'JAMAICA': 'No postal codes',
  'JM': 'No postal codes',
  'CUBA': '12345',
  'CU': '12345',
  'HAITI': '1234',
  'HT': '1234',
  'DOMINICAN REPUBLIC': '12345',
  'DO': '12345',
  'PUERTO RICO': '12345 or 12345-6789',
  'PR': '12345 or 12345-6789',
  'TRINIDAD AND TOBAGO': 'No postal codes',
  'TT': 'No postal codes',
  'BARBADOS': 'AB12345',
  'BB': 'AB12345',
  'BAHAMAS': 'No postal codes',
  'BS': 'No postal codes',
  'ANTIGUA AND BARBUDA': 'No postal codes',
  'AG': 'No postal codes',
  'SAINT LUCIA': 'No postal codes',
  'LC': 'No postal codes',
  'GRENADA': 'No postal codes',
  'GD': 'No postal codes',
  'SAINT VINCENT AND THE GRENADINES': 'No postal codes',
  'VC': 'No postal codes',
  'DOMINICA': 'No postal codes',
  'DM': 'No postal codes',
  'SAINT KITTS AND NEVIS': 'No postal codes',
  'KN': 'No postal codes',
}

/**
 * Validate postal code format for a specific country
 * @param postalCode Postal code to validate
 * @param country Country name or code
 * @returns Object with validation result and message
 */
export function validatePostalCode(postalCode: string, country: string): {
  isValid: boolean
  message?: string
  example?: string
} {
  if (!postalCode || !country) {
    return {
      isValid: false,
      message: 'Postal code and country are required'
    }
  }

  const normalizedCountry = country.toUpperCase().trim()
  const pattern = POSTAL_CODE_PATTERNS[normalizedCountry]
  const example = POSTAL_CODE_EXAMPLES[normalizedCountry]

  if (!pattern) {
    // Country not in our database - require non-empty value
    return {
      isValid: postalCode.trim().length > 0,
      message: postalCode.trim().length === 0 ? 'Postal code is required' : undefined
    }
  }

  const isValid = pattern.test(postalCode.trim())
  
  return {
    isValid,
    message: isValid ? undefined : `Invalid postal code format for ${country}`,
    example: isValid ? undefined : `Expected format: ${example}`
  }
}

/**
 * Format postal code according to country standards
 * @param postalCode Raw postal code
 * @param country Country name or code
 * @returns Formatted postal code
 */
export function formatPostalCode(postalCode: string, country: string): string {
  const cleanCode = postalCode.trim().toUpperCase()
  const normalizedCountry = country.toUpperCase().trim()
  
  switch (normalizedCountry) {
    // North America
    case 'CANADA':
    case 'CA':
      return cleanCode.replace(/^([A-Z]\d[A-Z])(\d[A-Z]\d)$/, '$1 $2')
    case 'UNITED STATES':
    case 'USA':
    case 'US':
      return cleanCode.replace(/^(\d{5})(\d{4})$/, '$1-$2')
    case 'PUERTO RICO':
    case 'PR':
      return cleanCode.replace(/^(\d{5})(\d{4})$/, '$1-$2')
    
    // Europe
    case 'UNITED KINGDOM':
    case 'UK':
    case 'GB':
    case 'ENGLAND':
    case 'SCOTLAND':
    case 'WALES':
      return cleanCode.replace(/^([A-Z]{1,2}\d{1,2}[A-Z]?)(\d[A-Z]{2})$/, '$1 $2')
    case 'NETHERLANDS':
    case 'NL':
      return cleanCode.replace(/^(\d{4})([A-Z]{2})$/, '$1 $2')
    case 'SWEDEN':
    case 'SE':
      return cleanCode.replace(/^(\d{3})(\d{2})$/, '$1 $2')
    case 'POLAND':
    case 'PL':
      return cleanCode.replace(/^(\d{2})(\d{3})$/, '$1-$2')
    case 'PORTUGAL':
    case 'PT':
      return cleanCode.replace(/^(\d{4})(\d{3})$/, '$1-$2')
    case 'CZECH REPUBLIC':
    case 'CZ':
      return cleanCode.replace(/^(\d{3})(\d{2})$/, '$1 $2')
    case 'SLOVAKIA':
    case 'SK':
      return cleanCode.replace(/^(\d{3})(\d{2})$/, '$1 $2')
    case 'GREECE':
    case 'GR':
      return cleanCode.replace(/^(\d{3})(\d{2})$/, '$1 $2')
    case 'MALTA':
    case 'MT':
      return cleanCode.replace(/^([A-Z]{3})(\d{4})$/, '$1 $2')
    case 'IRELAND':
    case 'IE':
      return cleanCode.replace(/^([A-Z]\d{2})([A-Z0-9]{4})$/, '$1 $2')
    
    // Asia
    case 'JAPAN':
    case 'JP':
      return cleanCode.replace(/^(\d{3})(\d{4})$/, '$1-$2')
    case 'TAIWAN':
    case 'TW':
      return cleanCode.replace(/^(\d{3})(\d{2})$/, '$1-$2')
    
    // Middle East
    case 'SAUDI ARABIA':
    case 'SA':
      return cleanCode.replace(/^(\d{5})(\d{4})$/, '$1-$2')
    case 'LEBANON':
    case 'LB':
      return cleanCode.replace(/^(\d{4})(\d{4})$/, '$1 $2')
    
    // South America
    case 'BRAZIL':
    case 'BR':
      return cleanCode.replace(/^(\d{5})(\d{3})$/, '$1-$2')
    case 'VENEZUELA':
    case 'VE':
      return cleanCode.replace(/^(\d{4})([A-Z])$/, '$1-$2')
    
    // Africa
    case 'SOMALIA':
    case 'SO':
      return cleanCode.replace(/^([A-Z]{2})(\d{5})$/, '$1 $2')
    
    // Caribbean
    case 'BARBADOS':
    case 'BB':
      return cleanCode.replace(/^([A-Z]{2})(\d{5})$/, '$1$2')
    
    default:
      return cleanCode
  }
}

/**
 * Get postal code placeholder text for a country
 * @param country Country name or code
 * @returns Placeholder text
 */
export function getPostalCodePlaceholder(country: string): string {
  const normalizedCountry = country.toUpperCase().trim()
  const example = POSTAL_CODE_EXAMPLES[normalizedCountry]
  
  return example ? `e.g., ${example}` : 'Enter postal code'
}