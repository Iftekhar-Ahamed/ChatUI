export class StringUtils {
    /**
     * Checks if a string is empty or contains only whitespace.
     * @param value - The string to check.
     * @returns `true` if the string is empty or contains only whitespace, otherwise `false`.
     */
    static isEmptyOrWhitespace(value: string | null | undefined): boolean {
        return !value || value.trim().length === 0;
    }

    /**
     * Capitalizes the first letter of a string.
     * @param value - The string to capitalize.
     * @returns The capitalized string.
     */
    static capitalize(value: string): string {
        if (StringUtils.isEmptyOrWhitespace(value)) {
            return value;
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    /**
     * Converts a string to lowercase.
     * @param value - The string to convert.
     * @returns The lowercase string.
     */
    static toLowerCase(value: string): string {
        return value?.toLowerCase() || '';
    }

    /**
     * Converts a string to uppercase.
     * @param value - The string to convert.
     * @returns The uppercase string.
     */
    static toUpperCase(value: string): string {
        return value?.toUpperCase() || '';
    }

    /**
     * Checks if a string is a valid email.
     * @param value - The string to check.
     * @returns `true` if the string is a valid email, otherwise `false`.
     */
    static isValidEmail(value: string): boolean {
        if (!value || value.trim().length === 0) {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }
}
