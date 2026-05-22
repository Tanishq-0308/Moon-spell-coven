export type BlogPost = {
  slug: string;
  category: string;
  emoji: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readingTime: string;
  author: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "full-moon-effects-zodiac-signs",
    category: "Moon Phases",
    emoji: "🌕",
    title: "How the Full Moon Affects Your Zodiac Sign This Month",
    excerpt:
      "The Full Moon amplifies emotions and brings hidden truths to the surface. Here's exactly how this month's lunation will touch every sign — and the rituals that help you ride the wave.",
    content: [
      "The Full Moon is the most emotionally charged point in the lunar cycle. It illuminates what has been hidden, brings cycles to completion, and intensifies whatever you have been suppressing.",
      "For Aries, this Full Moon highlights partnerships. For Taurus, it brings clarity around health and routine. For each sign the area of life affected is different — but the invitation is the same: release what is no longer serving you.",
      "Suggested ritual: light a white candle, write down what you want to release, and burn the paper safely. Spend the next three nights in quiet reflection.",
    ],
    date: "May 18, 2026",
    readingTime: "5 min read",
    author: "Moonspell Coven",
  },
  {
    slug: "best-crystal-for-your-sun-sign-2026",
    category: "Crystals",
    emoji: "💫",
    title: "Best Crystal For Your Sun Sign — Complete Guide 2026",
    excerpt:
      "Not every crystal works for every soul. Discover the one stone aligned with your sun sign's elemental energy — and how to work with it for love, career, and protection.",
    content: [
      "Each zodiac sign carries an elemental signature — fire, earth, air, or water — and certain crystals resonate more deeply with that energy.",
      "Fire signs (Aries, Leo, Sagittarius) thrive with Citrine and Carnelian. Earth signs (Taurus, Virgo, Capricorn) ground beautifully with Smoky Quartz and Moss Agate. Air signs (Gemini, Libra, Aquarius) sharpen with Clear Quartz and Sodalite. Water signs (Cancer, Scorpio, Pisces) feel held by Moonstone and Aquamarine.",
      "To work with your stone: hold it during a 5-minute morning meditation, then carry it in your pocket through the day.",
    ],
    date: "May 12, 2026",
    readingTime: "7 min read",
    author: "Moonspell Coven",
  },
  {
    slug: "mercury-retrograde-2026-survival-guide",
    category: "Planets",
    emoji: "☿",
    title: "Mercury Retrograde 2026 — Survival Guide For All Signs",
    excerpt:
      "Three Mercury retrogrades are on the calendar this year. Here's exactly what to expect, what to avoid, and how to use this notorious transit to your advantage.",
    content: [
      "Mercury retrograde happens roughly three times a year, and 2026 is no different. The planet of communication, travel, and technology appears to move backwards — and our lives often feel like they are doing the same.",
      "Avoid signing major contracts, launching big projects, or buying electronics during these windows. Do revisit, review, and reconnect — three R's that turn retrograde from chaos into clarity.",
      "Sign-by-sign: Geminis and Virgos (ruled by Mercury) feel it strongest. Earth signs benefit most by slowing down. Water signs find it brings emotional clarity.",
    ],
    date: "May 5, 2026",
    readingTime: "6 min read",
    author: "Moonspell Coven",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
