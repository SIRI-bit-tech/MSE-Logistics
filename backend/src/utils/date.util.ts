export class DateUtil {
  static addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  static addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000)
  }

  static getDaysDifference(date1: Date, date2: Date): number {
    const msPerDay = 24 * 60 * 60 * 1000
    return Math.floor((date2.getTime() - date1.getTime()) / msPerDay)
  }

  static getHoursDifference(date1: Date, date2: Date): number {
    const msPerHour = 60 * 60 * 1000
    return Math.floor((date2.getTime() - date1.getTime()) / msPerHour)
  }

  static isOverdue(estimatedDate: Date): boolean {
    return new Date() > estimatedDate
  }

  static formatForDisplay(date: Date): string {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
}
