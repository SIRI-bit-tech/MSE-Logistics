export class CurrencyUtil {
  private static readonly exchangeRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    CAD: 1.36,
    AUD: 1.53,
    INR: 83.12,
  }

  static convert(amount: number, fromCurrency: string, toCurrency: string): number {
    const fromRate = this.exchangeRates[fromCurrency] || 1
    const toRate = this.exchangeRates[toCurrency] || 1

    return (amount / fromRate) * toRate
  }

  static format(amount: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount)
  }

  static getSupportedCurrencies(): string[] {
    return Object.keys(this.exchangeRates)
  }
}
