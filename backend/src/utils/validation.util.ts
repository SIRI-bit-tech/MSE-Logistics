export class ValidationUtil {
  static isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  static isValidPhoneNumber(phone: string): boolean {
    const regex = /^[\d\s\-+$$$$]{10,}$/
    return regex.test(phone.replace(/\s/g, ""))
  }

  static isValidZipCode(zipCode: string): boolean {
    const regex = /^[A-Z0-9\s-]{5,10}$/
    return regex.test(zipCode.toUpperCase())
  }

  static isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
  }

  static validateWeight(weight: number): boolean {
    return weight > 0 && weight <= 10000
  }

  static validateDistance(distance: number): boolean {
    return distance > 0 && distance <= 40000
  }
}
