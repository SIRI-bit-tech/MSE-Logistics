export class TrackingNumberUtil {
  static generate(): string {
    const prefix = "MSE" // Mediterranean Shipping Express
    const year = new Date().getFullYear().toString().slice(-2)
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()

    return `${prefix}-${year}-${timestamp}-${random}`
  }

  static isValid(trackingNumber: string): boolean {
    return /^SS-\d{2}-\d{6}-[A-Z0-9]{6}$/.test(trackingNumber)
  }
}
