export interface CoupleConfig {
  person1: string;
  person2: string;
  title: string;
  subtitle: string;
  openingQuote: string;
  musicPath: string;
}

export interface ShayariCardData {
  text: string;
}

export interface ReasonCardData {
  iconName: 'Heart' | 'Sparkles' | 'Smile' | 'MessageCircle' | 'Gift' | 'Compass' | 'Eye';
  title: string;
  description: string;
}

export interface TimelineEventData {
  chapter: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryImageData {
  src: string;
  caption: string;
}

export interface FutureChapterData {
  title: string;
  description: string;
}

export interface LoveLetterData {
  heading: string;
  paragraphs: string[];
  signature: string;
}

export const coupleConfig: CoupleConfig = {
  person1: "Sakshi",
  person2: "Aditya",
  title: "Our Little Universe",
  subtitle: "Sakshi × Aditya",
  openingQuote: "Some people become a beautiful chapter in your life. Some become the reason you keep writing the story.",
  musicPath: "/music/our-song.wav", // Place your custom MP3 file in public/music/our-song.mp3
};

export const shayariList: ShayariCardData[] = [
  {
    text: "Tum mile toh laga,\njaise khamoshi ko bhi ek awaaz mil gayi,\naur meri adhuri si duniya ko\nek khoobsurat wajah mil gayi."
  },
  {
    text: "Teri muskurahat ka zikr kya karun,\nwoh pal bhi khoobsurat ho jaata hai\njismein tum bas ek baar muskura do."
  },
  {
    text: "Zindagi se zyada kuch nahi maanga tha,\nbas ek aisa insaan chahiye tha\njiske saath waqt guzarna\nwaqt barbaad karna na lage."
  },
  {
    text: "Har yaad mein tera naam sa milta hai,\nhar khushi mein tera ehsaas milta hai,\npata nahi kya rishta hai tumse,\npar dil ko sukoon sirf tumse milta hai."
  }
];

export const reasonsList: ReasonCardData[] = [
  {
    iconName: "Smile",
    title: "Your Smile",
    description: "Some smiles are beautiful. Yours has a way of making an ordinary day feel a little better."
  },
  {
    iconName: "Heart",
    title: "Your Kindness",
    description: "The soft, genuine way you care for people and things around you. It makes the world feel gentler."
  },
  {
    iconName: "MessageCircle",
    title: "Your Way of Understanding",
    description: "I don't need to explain myself to you. You read between the lines and hear what I don't say."
  },
  {
    iconName: "Sparkles",
    title: "The Little Things You Do",
    description: "The small gestures, your laughter, your expressions — things you don't even notice, but make my day."
  },
  {
    iconName: "Compass",
    title: "Making Ordinary Moments Memorable",
    description: "A simple walk, a random conversation, or just sitting in silence becomes a core memory when it's with you."
  },
  {
    iconName: "Eye",
    title: "The Comfort of Talking to You",
    description: "No filters, no judgments. Just pure comfort, where I can share my deepest thoughts and silliest jokes."
  },
  {
    iconName: "Gift",
    title: "Your Presence",
    description: "Just knowing that you are in my life makes it infinitely richer. You are my peaceful harbor."
  }
];

export const timelineEvents: TimelineEventData[] = [
  {
    chapter: "Chapter 01",
    date: "The Beginning",
    title: "The First Connection",
    description: "Every beautiful story starts with a moment that seemed ordinary at the time, but changed everything.",
    image: "/memories/memory-1.png" // Replace with actual photo at public/memories/memory-1.png
  },
  {
    chapter: "Chapter 02",
    date: "Getting Closer",
    title: "Late Night Conversations",
    description: "Some conversations slowly become memories you never want to forget. Finding comfort in our shared laughter.",
    image: "/memories/memory-2.png" // Replace with actual photo at public/memories/memory-2.png
  },
  {
    chapter: "Chapter 03",
    date: "The Little Moments",
    title: "Beautiful Realizations",
    description: "Sometimes the smallest moments become the biggest memories. Realizing you are the person I always want by my side.",
    image: "/memories/memory-3.png" // Replace with actual photo at public/memories/memory-3.png
  },
  {
    chapter: "Chapter 04",
    date: "Today",
    title: "Writing Our Own Story",
    description: "And somehow, the story is still being written, growing warmer, deeper, and more beautiful with each passing day.",
    image: "/memories/memory-4.png" // Replace with actual photo at public/memories/memory-4.png
  }
];

export const galleryImages: GalleryImageData[] = [
  {
    src: "/memories/gallery-1.png", // Replace in public/memories/gallery-1.png
    caption: "The silent warmth of your smile."
  },
  {
    src: "/memories/gallery-2.png", // Replace in public/memories/gallery-2.png
    caption: "The simple conversations that stay in my heart."
  },
  {
    src: "/memories/gallery-3.png", // Replace in public/memories/gallery-3.png
    caption: "A thousand feelings, one beautiful face."
  },
  {
    src: "/memories/gallery-4.png", // Replace in public/memories/gallery-4.png
    caption: "The comfort of knowing you're right here."
  },
  {
    src: "/memories/gallery-5.png", // Replace in public/memories/gallery-5.png
    caption: "Your laughter that makes everything feel perfect."
  },
  {
    src: "/memories/gallery-6.png", // Replace in public/memories/gallery-6.png
    caption: "Every day is beautiful, but days with you are magic."
  }
];

export const romanticQuotes: string[] = [
  "You don't have to make every day perfect. Sometimes your presence is enough to make it beautiful.",
  "If memories were stars, I'd never run out of light.",
  "Some people enter your life quietly and somehow become your favorite part of it.",
  "Home isn't always a place. Sometimes it's a person who makes you feel understood.",
  "Among all the ordinary moments of life, somehow you became my favorite one."
];

export const futureChapters: FutureChapterData[] = [
  {
    title: "More Laughs",
    description: "More moments that make us laugh for no reason, finding happiness in the simplest things."
  },
  {
    title: "More Memories",
    description: "More little moments worth remembering, captured in the scrapbooks of our hearts."
  },
  {
    title: "More Chapters",
    description: "Because the best stories are never finished too early, and ours has so much left to say."
  }
];

export const loveLetter: LoveLetterData = {
  heading: "A Few Words From Aditya",
  paragraphs: [
    "Sakshi,",
    "Some people are remembered because of the moments they created. Some are remembered because of the way they made you feel.",
    "You are a little bit of both.",
    "Thank you for being a beautiful part of my memories. And if life keeps giving us new chapters, I hope some of my favorite pages continue to have your name on them."
  ],
  signature: "— Aditya ❤️"
};
