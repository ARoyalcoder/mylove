export interface AdventureDestination {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  anchor: string;
  xPercent: number; // For map placement (0 - 100)
  yPercent: number;
  icon: string;
  themeColor: string;
}

export interface ButterflySecret {
  id: number;
  title: string;
  message: string;
  hindiTranslation?: string;
}

export interface RoomHotspot {
  id: "photo" | "letter" | "flower" | "lamp" | "star";
  label: string;
  icon: string;
  xPercent: number;
  yPercent: number;
  revealTitle: string;
  revealQuote: string;
  revealStory: string;
}

export interface FutureAdventureChoice {
  id: string;
  title: string;
  icon: string;
  tag: string;
  description: string;
  romanticNote: string;
  backgroundImage: string;
}

export const mapDestinations: AdventureDestination[] = [
  {
    id: "dest-beginning",
    chapter: "Chapter 01",
    title: "Where It Started",
    subtitle: "The magical first spark",
    anchor: "#beginning",
    xPercent: 18,
    yPercent: 70,
    icon: "🌸",
    themeColor: "#F8C8DC",
  },
  {
    id: "dest-butterflies",
    chapter: "Chapter 02",
    title: "The Butterfly Chapter",
    subtitle: "That unforgettable nervous smile",
    anchor: "#butterflies",
    xPercent: 30,
    yPercent: 38,
    icon: "🦋",
    themeColor: "#E98AA8",
  },
  {
    id: "dest-discovering",
    chapter: "Chapter 03",
    title: "Discovering Her",
    subtitle: "A thousand little details I notice",
    anchor: "#discovering-her",
    xPercent: 42,
    yPercent: 62,
    icon: "💗",
    themeColor: "#B84F72",
  },
  {
    id: "dest-memories",
    chapter: "Chapter 04",
    title: "Memory Adventure",
    subtitle: "Every place we've traveled in love",
    anchor: "#scrapbook",
    xPercent: 55,
    yPercent: 30,
    icon: "📸",
    themeColor: "#D8B56A",
  },
  {
    id: "dest-room",
    chapter: "Chapter 05",
    title: "The Memory Room",
    subtitle: "Little Things hidden in plain sight",
    anchor: "#memory-room",
    xPercent: 64,
    yPercent: 72,
    icon: "🕯️",
    themeColor: "#FFDDE8",
  },
  {
    id: "dest-midnight",
    chapter: "Chapter 06",
    title: "Late Night Talks",
    subtitle: "When the whole world is asleep",
    anchor: "#late-night",
    xPercent: 76,
    yPercent: 40,
    icon: "🌙",
    themeColor: "#250D18",
  },
  {
    id: "dest-future",
    chapter: "Chapter 07",
    title: "Future Adventures",
    subtitle: "The road we haven't taken yet",
    anchor: "#future-adventures",
    xPercent: 86,
    yPercent: 65,
    icon: "🌅",
    themeColor: "#F8C8DC",
  },
];

export const butterflySecrets: ButterflySecret[] = [
  {
    id: 1,
    title: "A Hidden Flutter ✨",
    message: "The way you smile without realizing someone is watching. It steals my focus every single time.",
    hindiTranslation: "Tumhari wo muskaan jo bina soche aati hai, wo meri sabse pasandeeda cheez hai.",
  },
  {
    id: 2,
    title: "Caught in Mid-Flight 💖",
    message: "I secretly love when you get excited about little everyday things. Your enthusiasm makes everything magical.",
    hindiTranslation: "Chhoti chhoti baaton par tumhari khushi dekhna mere din ka sabse khoobsurat hissa hota hai.",
  },
  {
    id: 3,
    title: "A Gentle Whisper 🌸",
    message: "Hearing your voice at the end of a long tiring day instantly resets my entire universe.",
    hindiTranslation: "Bas tumse baat ho jaaye toh lagta hai din bhar ki thakaan pal bhar mein mit gayi.",
  },
  {
    id: 4,
    title: "Midnight Secret 🌙",
    message: "I have re-read our sweetest chats and looked at your photos more times than I'll ever admit.",
    hindiTranslation: "Pata nahi kitni baar purane messages padh kar akele mein muskuraya hoon.",
  },
  {
    id: 5,
    title: "A Golden Promise ⭐",
    message: "Out of all 8 billion people on this planet, my heart chose you. And it would choose you again every lifetime.",
    hindiTranslation: "Pure jahan mein sirf tum ho, jiske saath dil ko sachha sukoon milta hai.",
  },
];

export const roomHotspots: RoomHotspot[] = [
  {
    id: "photo",
    label: "Framed Photograph",
    icon: "🖼️",
    xPercent: 32,
    yPercent: 52,
    revealTitle: "A memory I never want to lose.",
    revealQuote: "Moments are fleeting, but the way you made me feel in this moment is etched into my soul forever.",
    revealStory: "Looking at this photo reminds me that the best moments of our life aren't carefully planned — they just happen when I'm standing beside you.",
  },
  {
    id: "letter",
    label: "Handwritten Letters",
    icon: "✉️",
    xPercent: 44,
    yPercent: 68,
    revealTitle: "Something I never said out loud.",
    revealQuote: "Even when I sit silently looking at you, my heart is thanking the universe for bringing you into my life.",
    revealStory: "Sometimes words feel too small to hold how much you mean to me, Sakshi. So I write them down so you'll always have a piece of my love to hold.",
  },
  {
    id: "flower",
    label: "Pink Rose Bouquet",
    icon: "🌸",
    xPercent: 53,
    yPercent: 44,
    revealTitle: "You make ordinary days softer.",
    revealQuote: "Your presence is like fresh morning flowers — bringing gentle fragrance and beauty to every corner.",
    revealStory: "Before you, days were just days. With you, even a mundane Tuesday afternoon feels gentle, warm, and romantic.",
  },
  {
    id: "lamp",
    label: "Warm Bedside Lamp",
    icon: "🕯️",
    xPercent: 43,
    yPercent: 32,
    revealTitle: "Our quiet, safe haven.",
    revealQuote: "The warmth of our late-night conversations when the rest of the world has faded away.",
    revealStory: "In this light, with you talking softly about your day, I realize home isn't a building or a city. Home is right here.",
  },
  {
    id: "star",
    label: "Fairy Lights & Stars",
    icon: "⭐",
    xPercent: 22,
    yPercent: 18,
    revealTitle: "One tiny wish for our future.",
    revealQuote: "That fifty years from now, we still look at each other with this exact same smile.",
    revealStory: "No matter how many seasons pass, or how old we grow, I hope we never stop holding hands and giggling at silly jokes.",
  },
];

export const futureChoices: FutureAdventureChoice[] = [
  {
    id: "sunrise",
    title: "Sunrise Chai Together",
    icon: "🌅",
    tag: "A Morning Dream",
    description: "Sitting wrapped in a warm blanket as the sky turns soft baby pink and gold, sipping tea in peaceful silence.",
    romanticNote: "Watching the sun rise on your face is the only morning alarm I ever want.",
    backgroundImage: "/adventures/hero_pink_sunrise.jpg",
  },
  {
    id: "road-trip",
    title: "Spontaneous Coastal Drive",
    icon: "🚗",
    tag: "Winding Horizons",
    description: "Windows down, coastal sea breeze in your hair, our favorite playlist on loop, driving with nowhere we have to be.",
    romanticNote: "It doesn't matter where the road leads, as long as your hand is resting on mine.",
    backgroundImage: "/adventures/adventure_future_road.jpg",
  },
  {
    id: "sea",
    title: "Barefoot by the Ocean",
    icon: "🌊",
    tag: "Waves & Whispers",
    description: "Walking along wet sands at twilight, watching waves wash over our feet as the horizon turns to lavender.",
    romanticNote: "The ocean is vast and deep, but it pales compared to how deeply I adore you.",
    backgroundImage: "/adventures/adventure_future_road.jpg",
  },
  {
    id: "cabin",
    title: "Rainy Day Sanctuary",
    icon: "🌧️",
    tag: "Cozy & Quiet",
    description: "A wooden cabin surrounded by greenery, rain drumming on the rooftop, books, coffee, and you curled up beside me.",
    romanticNote: "Rain makes everything outside pause, giving us an excuse to stay in our own little world all day.",
    backgroundImage: "/adventures/adventure_memory_room.jpg",
  },
  {
    id: "rooftop",
    title: "Late-Night Stargazing",
    icon: "🌙",
    tag: "City Lights & Stars",
    description: "Lying on a rooftop under a blanket of pink and silver stars at 2 AM, pointing out constellations and laughing.",
    romanticNote: "You're the brightest star in any sky I'll ever gaze upon.",
    backgroundImage: "/adventures/adventure_midnight_stars.jpg",
  },
  {
    id: "slow-morning",
    title: "Slow Sunday In Bed",
    icon: "☕",
    tag: "Zero Rush",
    description: "No alarms, soft sunlight filtering through curtains, sweet breakfast in bed, talking about everything and nothing.",
    romanticNote: "My favorite part of any day will always be the slow mornings spent waking up next to you.",
    backgroundImage: "/adventures/adventure_memory_room.jpg",
  },
];
