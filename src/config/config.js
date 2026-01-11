const config = {
  data: {
    // Main invitation title that appears on the page
    title: "Sam & Feb",
    // Opening message/description of the invitation
    description:
      "Join us in Addis Ababa as we celebrate our forever love story.",
    // Groom's name
    groomName: "Sam",
    // Bride's name
    brideName: "Feb",
    // Groom's parents names
    parentGroom: "Mr. & Mrs. Samuel Smith",
    // Bride's parents names
    parentBride: "Mr. & Mrs. February Johnson",
    // Wedding date (format: YYYY-MM-DD)
    date: "2026-01-25",
    // Google Maps link for location (short clickable link)
    maps_url: "https://maps.app.goo.gl/abcdef",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15885.47480429288!2d38.7466!3d9.0222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef60c46a7%3A0x36e1c1b4a3e4a3e4!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1633666820004!5m2!1sen!2sus",
    // Event time (free format, example: "10:00 - 12:00 WIB")
    time: "4:00 PM - 6:00 PM EAT",
    // Venue/building name
    location: "Grand Ballroom, Sheraton Addis",
    // Full address of the wedding venue
    address: "Kirkos Subcity, Addis Ababa, Ethiopia",
    // Image that appears when link is shared on social media
    ogImage: "/images/og-image.jpg",
    // Icon that appears in browser tab
    favicon: "/images/favicon.ico",
    // List of event agenda/schedule
    agenda: [
      {
        // First event name
        title: "Wedding Ceremony",
        // Event date (format: YYYY-MM-DD)
        date: "2026-01-25",
        // Start time (format: HH:MM)
        startTime: "16:16",
        // End time (format: HH:MM)
        endTime: "17:30",
        // Event venue
        location: "Grand Ballroom, Sheraton Addis",
        // Full address
        address: "Kirkos Subcity, Addis Ababa, Ethiopia",
      },
      {
        // Second event name
        title: "Wedding Reception",
        date: "2026-01-25",
        startTime: "16:16",
        endTime: "17:30",
        location: "Grand Ballroom, Sheraton Addis",
        address: "Kirkos Subcity, Addis Ababa, Ethiopia",
      }
      // You can add more agenda items with the same format
    ],

    // Background music settings
    audio: {
      // Music file (choose one or replace with your own file)
      src: "/audio/fulfilling-humming.mp3", // or /audio/nature-sound.mp3
      // Music title to display
      title: "Fulfilling Humming", // or Nature Sound
      // Whether music plays automatically when website opens
      autoplay: true,
      // Whether music repeats continuously
      loop: true
    },

    // List of bank accounts for digital envelope/gifts
    banks: [
      // Commercial Bank of Ethiopia (CBE)
      {
        // Bank name
        bank: "Commercial Bank of Ethiopia",
        // Account number
        accountNumber: "1000123456789",
        // Account holder name (all uppercase)
        accountName: "SAM",
      },
      {
        bank: "Dashen Bank",
        accountNumber: "2000987654321",
        accountName: "FEB",
      },
      {
        bank: "Awash Bank",
        accountNumber: "3000456789123",
        accountName: "SAM & FEB",
      }
      // You can add more banks with the same format
    ]
  }
};

export default config;