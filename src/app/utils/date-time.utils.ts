export class DateTimeUtils {
    /**
     * Converts a string to a Date object.
     * @param dateStr - The date string to convert.
     * @returns A Date object if valid, otherwise null.
     */
    static parseDate(dateStr: string): Date | null {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? null : date;
    }

    /**
     * Checks if a given date is at least 18 years before today.
     * @param dateStr - The date string to check.
     * @returns `true` if the date is before 18 years ago, otherwise `false`.
     */
    static isBefore18Years(dateStr: string): boolean {
        const date = this.parseDate(dateStr);
        if (!date) {
            return false; // Invalid date string
        }

        const today = new Date();
        const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
        );

        return date <= eighteenYearsAgo;
    }

    /**
     * Formats a Date object into a specific string format (e.g., "YYYY-MM-DD").
     * @param date - The date to format.
     * @returns A formatted date string.
     */
    static formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Checks if a date string is valid.
     * @param dateStr - The date string to validate.
     * @returns `true` if the string is a valid date, otherwise `false`.
     */
    static isValidDateString(dateStr: string): boolean {
        return this.parseDate(dateStr) !== null;
    }

    /**
     * Calculates the difference in days between two dates.
     * @param date1 - The first date.
     * @param date2 - The second date.
     * @returns The difference in days.
     */
    static differenceInDays(date1: Date, date2: Date): number {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    /**
     * Checks if a date is in the past.
     * @param dateStr - The date string to check.
     * @returns `true` if the date is in the past, otherwise `false`.
     */
    static isInThePast(dateStr: string): boolean {
        const date = this.parseDate(dateStr);
        if (!date) {
            return false;
        }
        return date < new Date();
    }
}
