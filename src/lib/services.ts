export type Service = {
  slug: string;
  icon: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  includes: string[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "birth-chart-reading",
    icon: "🔮",
    name: "Birth Chart Reading",
    shortName: "Birth Chart",
    tagline: "Deep dive into your kundli",
    description:
      "Deep dive into your kundli — understand your personality, strengths, challenges and life path.",
    longDescription:
      "Your birth chart (kundli) is a cosmic map of where the planets stood at the exact moment you were born. In this 45-minute session, we decode your sun, moon and rising signs, planetary positions, and the houses they activate — giving you a clear picture of your personality patterns, career direction, relationship dynamics, and karmic lessons. You'll leave with a personalised written summary and an audio recording of the reading.",
    price: 999,
    duration: "45 min session",
    includes: [
      "Full Vedic birth chart analysis",
      "Personality, career & relationship breakdown",
      "Audio recording of the session",
      "Written PDF summary",
      "One free follow-up question over email",
    ],
    faqs: [
      {
        q: "What information do I need to share?",
        a: "Your exact date of birth, time of birth (as accurate as possible), and place of birth.",
      },
      {
        q: "How is the session conducted?",
        a: "Sessions happen over Zoom or WhatsApp video call, scheduled at a time that works for you.",
      },
    ],
  },
  {
    slug: "tarot-card-reading",
    icon: "🃏",
    name: "Tarot Card Reading",
    shortName: "Tarot Reading",
    tagline: "Clarity on love, career & life",
    description:
      "Get clarity on love, career or life decisions through an intuitive tarot reading personalised for you.",
    longDescription:
      "A focused 30-minute tarot session designed around one specific question or area of your life — love, career, finances, or a decision you're stuck on. The cards reveal what's hidden, what's coming, and what action will move you forward. Honest, compassionate, and grounded in intuition rather than fear.",
    price: 699,
    duration: "30 min session",
    includes: [
      "Focused reading on one area of life",
      "Photos of your card spread",
      "Audio recording",
      "Suggested next steps & affirmations",
    ],
    faqs: [
      {
        q: "How many questions can I ask?",
        a: "One main question plus 2–3 follow-up questions within the session.",
      },
      {
        q: "Are readings accurate?",
        a: "Tarot reflects energies, not fixed fate. We use it as a tool for clarity and reflection.",
      },
    ],
  },
  {
    slug: "love-and-protection-spells",
    icon: "🕯️",
    name: "Love & Protection Spells",
    shortName: "Spell Kits",
    tagline: "Sacred rituals with intention",
    description:
      "Sacred rituals crafted with intention, herbs and crystals to attract love, peace and abundance.",
    longDescription:
      "Each spell kit is hand-crafted on an auspicious day, charged under the moon, and shipped with a personalised intention card. Choose from love, protection, abundance, or self-healing rituals. Includes a candle, herbs, crystals, and a step-by-step ritual guide tailored to your zodiac.",
    price: 1499,
    duration: "ritual kit",
    includes: [
      "Hand-crafted ritual candle",
      "Sacred herbs & oils",
      "Two crystals chosen for your sign",
      "Step-by-step ritual guide",
      "Personalised intention card",
    ],
    faqs: [
      {
        q: "Are these religious?",
        a: "No. Our rituals draw from spiritual traditions but are non-religious and inclusive.",
      },
      {
        q: "How long do they take to ship?",
        a: "Allow 5–7 business days within India for hand-crafting and dispatch.",
      },
    ],
  },
  {
    slug: "personalised-affirmations",
    icon: "✨",
    name: "Personalised Affirmations",
    shortName: "Affirmations",
    tagline: "Custom mantras for your chart",
    description:
      "Custom affirmations based on your birth chart — designed to rewire your energy and mindset.",
    longDescription:
      "A beautifully designed PDF of 21 affirmations written specifically for your birth chart — addressing your unique strengths, challenges, and the energetic patterns you were born with. Designed to be read morning and night for 21 days to rewire your mindset.",
    price: 499,
    duration: "PDF delivery",
    includes: [
      "21 affirmations tailored to your chart",
      "Beautifully designed PDF",
      "Suggested 21-day practice guide",
      "Delivered within 48 hours",
    ],
    faqs: [
      {
        q: "How is this different from generic affirmations?",
        a: "Generic affirmations target everyone. Yours are written for your specific planetary placements.",
      },
      {
        q: "Can I share them?",
        a: "They're crafted for your chart, so they'll resonate most with you — but feel free to share.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
