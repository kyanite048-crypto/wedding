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
        title: "The Holy Matrimony Wedding Ceremony",
        // Event date (format: YYYY-MM-DD)
        date: "2026-01-25",
        // Start time (format: HH:MM)
        startTime: "08:00",
        // End time (format: HH:MM)
        endTime: "10:00",
        // Event venue
        location: "Bole Kale Hiwot Church",
        // Full address
        address: "Addis Ababa, Ethiopia",
        // Venue link (Google Maps)
        venueLink: "https://www.google.com/maps/place/Bole+Kale+Hiwot+Church+%7C+%E1%89%A6%E1%88%8C+%E1%89%83%E1%88%88+%E1%88%95%E1%8B%AD%E1%8B%88%E1%89%B5+%E1%89%A4%E1%89%B0+%E1%8A%AD%E1%88%AD%E1%88%B5%E1%89%B2%E1%8B%AB%E1%8A%95/@8.9790758,38.7734932,866m/data=!3m2!1e3!4b1!4m6!3m5!1s0x164b85a8c15e65ff:0x313f36494eb7845b!8m2!3d8.9790705!4d38.7760681!16s%2Fg%2F11rj_hqm82",
      },
      {
        // Second event name
        title: "Wedding Dinner Program",
        date: "2026-01-25",
        startTime: "12:00",
        endTime: "16:00",
        location: "Bihere Tsige Public Park",
        address: "Addis Ababa, Ethiopia",
        // Venue link (Google Maps)
        venueLink: "https://www.google.com/maps/place/Bihere+Tsige+Park/@8.9565931,38.750713,866m/data=!3m2!1e3!4b1!4m6!3m5!1s0x164b830035bba0f7:0x9a187e441e905b65!8m2!3d8.9565878!4d38.7532879!16s%2Fg%2F11x092m4k0",
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