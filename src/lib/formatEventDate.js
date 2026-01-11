/**
 * Formats a date string into English format
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @param {boolean} [isAddisTime=false] - Whether the input is already in Addis Ababa time
 * @returns {string} The formatted date string in English
 *
 * @example
 * // returns "Monday, January 1, 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "full")
 *
 * // returns "January 1, 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "short")
 *
 * // returns "12:00 AM"
 * formatEventDate("2024-01-01T00:00:00.000Z", "time")
 */
export const formatEventDate = (isoString, format = 'full', isAddisTime = false) => {
    let date = new Date(isoString);

    // If the timestamp is already in Addis Ababa time (from API), we need to adjust it
    // because JavaScript Date constructor assumes UTC for ISO strings
    if (isAddisTime && isoString && !isoString.endsWith('Z')) {
        // Add 'Z' to treat it as UTC, then it will be converted correctly to Addis Ababa time
        date = new Date(isoString + 'Z');
    }

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Africa/Addis_Ababa'
        },
        short: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Africa/Addis_Ababa'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Africa/Addis_Ababa'
        }
    };

    let formatted = date.toLocaleDateString('en-US', formats[format]);

    // Handle time format separately
    if (format === 'time') {
        return date.toLocaleTimeString('en-US', formats[format]);
    }

    return formatted;
};