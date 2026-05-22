export type Crystal = {
  slug: string;
  name: string;
  emoji: string;
  benefit: string;
  longDescription: string;
  price: number;
  badge?: "Bestseller" | "New";
  properties: string[];
  zodiac: string[];
  chakra: string;
  origin: string;
};

export const CRYSTALS: Crystal[] = [
  {
    slug: "rose-quartz",
    name: "Rose Quartz",
    emoji: "🌸",
    benefit: "Love, self-care & emotional healing",
    longDescription:
      "Known as the stone of unconditional love, Rose Quartz opens the heart chakra to all forms of love — self-love, romantic, familial, and platonic. It carries a soft, feminine energy that soothes emotional wounds, promotes self-acceptance, and invites tenderness back into your life.",
    price: 399,
    badge: "Bestseller",
    properties: ["Love", "Self-care", "Emotional healing", "Forgiveness"],
    zodiac: ["Taurus", "Libra"],
    chakra: "Heart",
    origin: "Brazil",
  },
  {
    slug: "amethyst",
    name: "Amethyst",
    emoji: "💜",
    benefit: "Calm mind, intuition & protection",
    longDescription:
      "Amethyst is a powerful spiritual stone that calms the mind, deepens intuition, and shields against negative energies. Place it by your bedside for restful sleep or hold it during meditation to access deeper states of awareness.",
    price: 449,
    properties: ["Intuition", "Calm", "Protection", "Sleep"],
    zodiac: ["Pisces", "Aquarius", "Virgo"],
    chakra: "Third Eye, Crown",
    origin: "Brazil & Uruguay",
  },
  {
    slug: "black-tourmaline",
    name: "Black Tourmaline",
    emoji: "🖤",
    benefit: "Protection, grounding & negative energy shield",
    longDescription:
      "The ultimate protection stone. Black Tourmaline absorbs negative energy, electromagnetic stress, and psychic attacks, while grounding you firmly to the earth. Keep one at your front door or workspace.",
    price: 349,
    badge: "New",
    properties: ["Protection", "Grounding", "EMF shield", "Cleansing"],
    zodiac: ["Capricorn", "Scorpio"],
    chakra: "Root",
    origin: "Brazil",
  },
  {
    slug: "clear-quartz",
    name: "Clear Quartz",
    emoji: "🤍",
    benefit: "Clarity, amplification & manifestation",
    longDescription:
      "The master healer. Clear Quartz amplifies the energy of other crystals and your own intentions, making it the perfect base for any manifestation or healing practice.",
    price: 299,
    properties: ["Clarity", "Amplification", "Manifestation", "Healing"],
    zodiac: ["All signs"],
    chakra: "Crown",
    origin: "Brazil",
  },
  {
    slug: "citrine",
    name: "Citrine",
    emoji: "🌞",
    benefit: "Abundance, joy & confidence",
    longDescription:
      "The merchant's stone. Citrine attracts wealth, success and joy — and unlike most crystals, it never needs cleansing as it transmutes negative energy.",
    price: 549,
    properties: ["Abundance", "Confidence", "Joy", "Success"],
    zodiac: ["Leo", "Gemini", "Aries"],
    chakra: "Solar Plexus",
    origin: "Brazil",
  },
  {
    slug: "selenite",
    name: "Selenite",
    emoji: "🤍",
    benefit: "Cleansing, peace & spiritual connection",
    longDescription:
      "A high-vibration stone that cleanses other crystals and spaces. Selenite brings mental clarity, peace, and connection to higher self. Never place in water — it dissolves.",
    price: 399,
    properties: ["Cleansing", "Peace", "Clarity", "Aura cleansing"],
    zodiac: ["Cancer", "Taurus"],
    chakra: "Crown",
    origin: "Morocco",
  },
];

export function getCrystal(slug: string): Crystal | undefined {
  return CRYSTALS.find((c) => c.slug === slug);
}
