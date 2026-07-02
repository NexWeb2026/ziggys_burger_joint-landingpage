import logoPng from "@/assets/images/logo.jpg";

import facebookIconBlack from "@/assets/svg/facebook_black.svg";
import instagramIconBlack from "@/assets/svg/instagram_black.svg";
import tiktokIconBlack from "@/assets/svg/tiktok_black.svg";
import whatsappIconBlack from "@/assets/svg/whatsapp_black.svg";
import xIconBlack from "@/assets/svg/x_black.svg";
import uberEatsIconBlack from "@/assets/svg/ubereats_black.svg";
import mrdFoodIconBlack from "@/assets/svg/mrdfoods_black.svg";

import facebookIcon from "@/assets/svg/facebook.svg";
import instagramIcon from "@/assets/svg/instagram.svg";
import tiktokIcon from "@/assets/svg/tiktok.svg";
import whatsappIcon from "@/assets/svg/whatsapp.svg";
import xIcon from "@/assets/svg/x.svg";
import uberEatsIcon from "@/assets/svg/ubereats.svg";
import mrdFoodIcon from "@/assets/svg/mrdfoods.svg";

const imageAssets = import.meta.glob<{ default: string }>("./assets/images/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

const imageUrl = (filename: string) => imageAssets[`./assets/images/${filename}`]?.default ?? "";

export type WeeklyHours = {
  day: string;
  dayIndex: number;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  note?: string;
};

export type EventListing = {
  name: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  googleMapsUrl?: string;
  notes?: string;
  description: string;
  type: string;
  ticketUrl?: string;
};

export type MenuTag =
  | "Chef's Pick" | "Seasonal" | "Vegetarian" | "Vegan"
  | "GF" | "Halal" | "New" | "Signature";

export type MenuCategory =
  | "Grills"
  | "Combos"
  | "Burgers"
  | "Smash Burgers"
  | "Starters"
  | "Light Meals"
  | "Junior Favourites"
  | "Desserts"
  | "Drinks";

export type MenuEntry = {
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  tags: MenuTag[];
  image: string;
  pairingNote?: string;
};

export const siteConfig = {
  sections: {
    hero: true,
    about: true,
    todaysSpecial: false,
    tastingMenu: false,
    newsletter: false,
    reservationForm: false,
    privateDining: false,
    menuSpecial: true,
    menuGrid: true,
    reviews: true,
    pressFeatures: true,
    photoGallery: true,
    upcomingEvents: false,
    privateHire: false,
    contactDetails: true,
    eventsForm: false,
    location: true,
    locationMap: true,
    hours: true,
    gifts: false,
    footer: true,
    mobileBar: true,
    banner: true,
    delivery: true,
    menu: true,
    reservations: true,
    gallery: true,
    specials: true,
    socials: true,
  },

  integrations: {
    socialLinksEnabled: true,
    whatsappEnabled: true,
    reservationsEnabled: false,
    deliveryEnabled: true,
  },

  branding: {
    logo: logoPng,
    logoAlt: "Ziggy's Burger Joint logo",
  },

  iconAssets: {
    instagram: instagramIcon,
    tiktok: tiktokIcon,
    facebook: facebookIcon,
    whatsapp: whatsappIcon,
    x: xIcon,
    uberEats: uberEatsIcon,
    mrdFood: mrdFoodIcon,
    instagramBlack: instagramIconBlack,
    tiktokBlack: tiktokIconBlack,
    facebookBlack: facebookIconBlack,
    whatsappBlack: whatsappIconBlack,
    xBlack: xIconBlack,
    uberEatsBlack: uberEatsIconBlack,
    mrdFoodBlack: mrdFoodIconBlack,
  },

  restaurantName: "Ziggy's Burger Joint",
  tagline: "Crafted with Fire, Served with Heart",
  cuisineType: "Burgers & Grill",
  foundedYear: 2022,

  colors: {
    brand: {
      primary: "#E8213A",
      primarySoft: "#FF4D63",
      primaryStrong: "#A81528",
      onPrimary: "#FFFFFF",
    },
    ui: {
      page: "#0D0D0D",
      panel: "#161616",
      panelAlt: "#1F1F1F",
      text: "#F5F5F5",
      textMuted: "rgba(245,245,245,0.65)",
      textSubtle: "rgba(245,245,245,0.4)",
      border: "rgba(245,245,245,0.08)",
      borderStrong: "rgba(245,245,245,0.25)",
    },
    status: {
      success: "#4ADE80",
      warning: "#F4A124",
      danger: "#E8213A",
    },
  },

  story:
    "Ziggy's Burger Joint opened on Imam Haron Road in Lansdowne, Cape Town, with one mission - serve proper, hearty food without breaking the bank. From juicy smash burgers to fall-off-the-bone ribs and life-changing milkshakes, Ziggy's quickly became a go-to spot for families and food lovers across Cape Town. The vibe is casual, the portions are generous, and the passion behind every plate is real. Whether it's your first visit or your tenth, you'll leave full, happy, and already planning your next order.",

  chef: {
    name: "Glen",
    title: "Front of House",
    bio: "Glen is the face of Ziggy's - known for his warm hospitality and spot-on recommendations. Whether it's your first time or a regular Tuesday, he'll steer you right every time.",
    quote: "Let me help you find your new favourite.",
    image: imageUrl("owner.jpg"),
    signatureDish: "Rib Box",
  },

  heroImage: imageUrl("hero_image.jpg"),
  interiorImage: imageUrl("in_image.jpg"),

  stats: [
    { label: "Established", value: "2022" },
    { label: "Rating", value: "5 Stars on Google" },
    { label: "Location", value: "Lansdowne, Cape Town" },
  ],

  hours: [
    { day: "Monday", dayIndex: 1, isOpen: true, openTime: "13:00", closeTime: "21:00" },
    { day: "Tuesday", dayIndex: 2, isOpen: true, openTime: "11:00", closeTime: "21:00" },
    { day: "Wednesday", dayIndex: 3, isOpen: true, openTime: "11:00", closeTime: "21:00" },
    { day: "Thursday", dayIndex: 4, isOpen: true, openTime: "11:00", closeTime: "21:00" },
    { day: "Friday", dayIndex: 5, isOpen: true, openTime: "11:00", closeTime: "22:00" },
    { day: "Saturday", dayIndex: 6, isOpen: true, openTime: "11:00", closeTime: "22:00" },
    { day: "Sunday", dayIndex: 0, isOpen: true, openTime: "11:00", closeTime: "21:00" },
  ] as WeeklyHours[],

  location: {
    address: "495 Imam Haron Rd, Lansdowne, Cape Town, 7780",
    googleMapsUrl: "https://maps.app.goo.gl/A85GcSkX2NhZHvHz5",
    mapEmbedUrl: "https://www.google.com/maps?q=-33.9892698,18.5001025&output=embed",
    parkingNote: "Street parking available on Imam Haron Rd.",
    accessibilityNote: "",
    paymentMethods: ["Cash", "Visa", "Mastercard", "Tap", "EFT"],
  },

  reservations: {
    note: "We'll confirm your booking as soon as we can.",
    privateDiningNote: "Hosting a group? Get in touch and we'll sort you out.",
    largeGroupNote: "For groups of 8+, please contact us directly via WhatsApp.",
    timeslots: [
      "11:00", "11:30", "12:00", "12:30", "13:00",
      "13:30", "14:00", "17:00", "17:30", "18:00",
      "18:30", "19:00", "19:30", "20:00",
    ],
  },

  menuFilters: {
    categories: [
      "All",
      "Grills",
      "Combos",
      "Burgers",
      "Smash Burgers",
      "Starters",
      "Light Meals",
      "Junior Favourites",
      "Desserts",
      "Drinks",
    ] as const,
    tags: [
      "Chef's Pick", "Seasonal", "Vegetarian", "Vegan",
      "GF", "Halal", "New", "Signature",
    ] as MenuTag[],
  },

  todaysSpecial: {
    name: "The Rib Box",
    description: "1kg beef ribs, BBQ sausage, 6 full sticky wings, fries and onion rings. The full experience.",
    price: "R600",
    image: "",
    tags: ["Signature", "Chef's Pick"] as MenuTag[],
    note: "Best shared - or not. We don't judge.",
  },

  tastingMenu: {
    name: "The Ziggy's Experience",
    courses: 4,
    price: "R450 per person",
    winePairing: "",
    note: "Ask us about group packages and special occasions.",
  },

  menu: [
    // GRILLS
    { name: "Rib Eye Steak 350g", description: "Served with fries or mash potato, crispy onion rings and garlic aioli.", price: "R255", category: "Grills", tags: [], image: "" },
    { name: "T-Bone Steak 350g", description: "Served with fries or mash potato, crispy onion rings and garlic aioli.", price: "R245", category: "Grills", tags: ["Chef's Pick"], image: "" },
    { name: "Fillet Steak 200g", description: "Served with fries or mash potato, crispy onion rings and garlic aioli.", price: "R235", category: "Grills", tags: [], image: "" },
    { name: "Tomahawk Steak", description: "Served with fries or mash potato, crispy onion rings and garlic aioli.", price: "R355", category: "Grills", tags: ["Signature"], image: "" },
    { name: "Rump Steak 350g", description: "Served with fries or mash potato, crispy onion rings and garlic aioli.", price: "R235", category: "Grills", tags: [], image: "" },
    { name: "Sirloin Steak 350g", description: "Served with fries or mash potato, crispy onion rings and garlic aioli.", price: "R245", category: "Grills", tags: [], image: "" },
    { name: "Beef Ribs 500g", description: "Served with fries or mash potato, crispy onion rings and garlic aioli.", price: "R295", category: "Grills", tags: [], image: "" },
    { name: "4 Lamb Cutlets", description: "Served with fries or mash potato, crispy onion rings and garlic aioli.", price: "R245", category: "Grills", tags: [], image: "" },
    { name: "Lamb Shank", description: "Garlic, red BBQ sauce, creamy mash, onion rings and garlic aioli.", price: "R315", category: "Grills", tags: ["Signature"], image: "" },
    { name: "Rib Box", description: "1kg beef ribs, BBQ sausage, 6 full sticky wings, fries and onion rings.", price: "R600", category: "Grills", tags: ["Signature", "Chef's Pick"], image: "" },

    // COMBOS
    { name: "Prawn & Fillet Steak", description: "4 prawns with 200g fillet steak and a side. Served with fries.", price: "R285", category: "Combos", tags: [], image: "" },
    { name: "Beef Ribs & Wings", description: "500g beef ribs with 4 full BBQ sticky wings.", price: "R285", category: "Combos", tags: [], image: "" },
    { name: "Mixed Grill", description: "2 lamb cutlets, 1 sausage, 2 full sticky wings, 150g rump steak and 1 fried egg.", price: "R285", category: "Combos", tags: ["Chef's Pick"], image: "" },

    // BURGERS
    { name: "Ziggy Beef Single", description: "180g beef patty, slice of cheese and garnish with a side of fries.", price: "R110", category: "Burgers", tags: [], image: "" },
    { name: "Ziggy Beef Double", description: "2x 180g beef patties, 2x slices of cheese and garnish with a side of fries.", price: "R160", category: "Burgers", tags: [], image: "" },
    { name: "Mister Beeg", description: "3x 180g beef patties, 3x slices of cheese, crispy onion rings, slice of pastrami, garnish with a side of fries.", price: "R195", category: "Burgers", tags: ["Signature"], image: "" },
    { name: "Beef Full House", description: "2x 180g beef patties, slice of cheese, crispy onion rings, pastrami, 1x egg and garnish with a side of fries.", price: "R180", category: "Burgers", tags: [], image: "" },
    { name: "De-Boned Rib Burger", description: "BBQ beef ribs, slice of cheese, crispy onion rings and garnish with a side of fries.", price: "R195", category: "Burgers", tags: ["Chef's Pick"], image: "" },
    { name: "Ziggy Chicken Single", description: "Grilled chicken fillet, slice of cheese, garnish and a side of fries.", price: "R110", category: "Burgers", tags: [], image: "" },
    { name: "Ziggy Chicken Double", description: "2x grilled chicken fillets, 2x slices of cheese, garnish and a side of fries.", price: "R160", category: "Burgers", tags: [], image: "" },
    { name: "Crumbed Chicken", description: "Panko crumbed chicken breast, slice of cheese, coleslaw, red onion, pickles with a side of fries.", price: "R125", category: "Burgers", tags: [], image: "" },

    // SMASH BURGERS
    { name: "Double Smash", description: "2x 100g smashed beef, 2x slices of cheese, crispy onions, inhouse sauce with a side of fries.", price: "R130", category: "Smash Burgers", tags: ["New"], image: "" },
    { name: "Triple Smash", description: "3x 100g smashed beef, 3x slices of cheese, crispy onions, inhouse sauce with a side of fries.", price: "R155", category: "Smash Burgers", tags: ["New"], image: "" },
    { name: "Pastrami Stack Smash", description: "3x 100g smashed beef, 3x slices of cheese, crispy onions, pastrami, inhouse sauce with a side of fries.", price: "R165", category: "Smash Burgers", tags: ["New", "Signature"], image: "" },

    // STARTERS
    { name: "4 Full Sticky Wings", description: "4 BBQ sticky wings with a dipping sauce.", price: "R80", category: "Starters", tags: [], image: "" },
    { name: "Cheesy Garlic Roll", description: "Garlic roll with melted mozzarella cheese.", price: "R75", category: "Starters", tags: ["Vegetarian"], image: "" },
    { name: "Margherita Pizza", description: "Classic margherita with mozzarella.", price: "R130", category: "Starters", tags: ["Vegetarian"], image: "" },
    { name: "Garlic Chita", description: "Garlic flavoured chita bread.", price: "R130", category: "Starters", tags: ["Vegetarian"], image: "" },

    // LIGHT MEALS
    { name: "Chicken Schnitzel", description: "Panko crumbed chicken fillet with a slice of cheese, topped with mushroom sauce and fries.", price: "R145", category: "Light Meals", tags: [], image: "" },
    { name: "8 Full Sticky Wings", description: "8 full BBQ basted wings served with fries.", price: "R155", category: "Light Meals", tags: [], image: "" },
    { name: "Chicken Tenders", description: "Panko crumbed chicken tenders served with onion rings, a dipping sauce and fries.", price: "R125", category: "Light Meals", tags: [], image: "" },

    // JUNIOR FAVOURITES
    { name: "Cheese Burger", description: "Kids meal - all junior meals include fries.", price: "R85", category: "Junior Favourites", tags: [], image: "" },
    { name: "Chicken Tenders (Kids)", description: "Kids meal - all junior meals include fries.", price: "R85", category: "Junior Favourites", tags: [], image: "" },
    { name: "4 Full Wings (Kids)", description: "Kids meal - all junior meals include fries.", price: "R100", category: "Junior Favourites", tags: [], image: "" },

    // DRINKS
    { name: "Turkish Delight Gourmet Shake", description: "The one everyone talks about. Rich, indulgent, and genuinely life-changing.", price: "", category: "Drinks", tags: ["Signature"], image: "" },
    { name: "Custard Dream Milkshake", description: "Creamy, smooth, and seriously good.", price: "", category: "Drinks", tags: ["Signature"], image: "" },
    { name: "Strawberry Fluff", description: "Light and fruity - a crowd favourite.", price: "", category: "Drinks", tags: [], image: "" },
    { name: "Chocolate Shake", description: "Classic chocolate milkshake done right.", price: "", category: "Drinks", tags: [], image: "" },
    { name: "Mango Crush", description: "Refreshing mango crush - perfect with the ribs.", price: "", category: "Drinks", tags: [], image: "" },
    { name: "Cappuccino", description: "Proper coffee to finish off your meal.", price: "", category: "Drinks", tags: [], image: "" },
  ] as MenuEntry[],

  events: [] as EventListing[],

  gallery: [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
  ].map(imageUrl),

  reviews: [
    { name: "Amatullah H.", location: "Cape Town", stars: 5, quote: "All I can say is YOH!! Amazing, honestly well done. A huge variety of options - like Spur on steroids. Try the Turkish Delight gourmet shake. LIFE CHANGING!" },
    { name: "Faaeze D.", location: "Cape Town", stars: 5, quote: "Our waiter Glen was so helpful with his suggestions. The rib box was way too much for 2 people but our kids enjoyed the leftovers. Food was delicious, so was the custard dream milkshake. We will definitely be back." },
    { name: "Rafee'ah A.", location: "Cape Town", stars: 5, quote: "I had the 500g ribs and a mango crush which I absolutely loved. First time coming here but will definitely not be my last." },
    { name: "Kauthar I.", location: "Cape Town", stars: 5, quote: "Tender and flavorful steak, top-notch service, great ambiance - and the best part? It's affordable. Exceptional quality without breaking the bank." },
    { name: "Shanny H.", location: "Cape Town", stars: 5, quote: "Tried the ribs and wings combo for the first time - I honestly enjoyed the whole meal. Will definitely be back for the smash burgers." },
  ],

  ratings: {
    googleRating: 3.9,
    reviewCount: 90,
    tripAdvisorUrl: "",
    leaveReviewUrl: "https://maps.app.goo.gl/A85GcSkX2NhZHvHz5",
  },

  pressFeatures: [
    { publication: "Google Reviews", quote: "Like Spur on steroids - a huge variety with real quality at prices that make sense." },
    { publication: "Cape Town Locals", quote: "Generous portions, friendly faces, and food that hits every single time." },
    { publication: "Lansdowne Community", quote: "Ziggy's is the kind of spot you tell everyone about after your very first visit." },
  ],

  gifts: {
    voucherNote: "Gift vouchers available. Perfect for birthdays and special occasions.",
    voucherUrl: "#",
    loyaltyNote: "Regular at Ziggy's? Ask your server about our loyalty perks.",
  },

  delivery: [
    {
      name: "Uber Eats",
      url: "https://www.ubereats.com/za/store/ziggys-burger-joint/EZd4Eng1U5ibO6LxaNoB_w?srsltid=AfmBOoqpVidOEg-gzIYpnC_Ti67XXNPBja5GWzrg_6cctYpmBERCYUX8",
      icon: uberEatsIcon,
      iconBlack: uberEatsIconBlack,
      iconAlt: "Uber Eats logo",
    },
    {
      name: "Mr D Food",
      url: "https://www.mrd.com/delivery/restaurant/ziggys-burger-joint-lansdowne/29171",
      icon: mrdFoodIcon,
      iconBlack: mrdFoodIconBlack,
      iconAlt: "Mr D Food logo",
    },
  ],

  contact: {
    phone: "+27 76 992 5473",
    whatsapp: "+27769925473",
    email: "",
    responseTimeNote: "We'll get back to you as soon as we can.",
    cateringResponseNote: "Group bookings and private enquiries answered within 24 hours.",
  },

  socials: {
    instagram: "https://www.instagram.com/ziggys_burger/",
    tiktok: "https://www.tiktok.com/@ziggys_burger_joint",
    facebook: "https://www.facebook.com/ziggysburgerjoint/",
    handle: "@ziggysburgerjoint",
    whatsappChannelUrl: "https://wa.me/27769925473",
  },
};

export type MenuItem = (typeof siteConfig.menu)[number];
export const data = siteConfig;

