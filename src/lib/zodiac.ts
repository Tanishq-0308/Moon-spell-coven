export type ZodiacSign = {
  slug: string;
  name: string;
  symbol: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  dates: string;
  rulingPlanet: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
  luckyCrystal: string;
  description: string;
};

export const ZODIAC: ZodiacSign[] = [
  {
    slug: "aries",
    name: "Aries",
    symbol: "♈",
    element: "Fire",
    dates: "Mar 21 – Apr 19",
    rulingPlanet: "Mars",
    traits: ["Bold", "Pioneering", "Energetic", "Direct"],
    strengths: ["Leadership", "Courage", "Initiative", "Confidence"],
    challenges: ["Impatience", "Impulsivity", "Short temper"],
    luckyCrystal: "Carnelian",
    description:
      "The first sign of the zodiac. Aries is the spark that lights the fire — bold, brave, and always first to leap into action.",
  },
  {
    slug: "taurus",
    name: "Taurus",
    symbol: "♉",
    element: "Earth",
    dates: "Apr 20 – May 20",
    rulingPlanet: "Venus",
    traits: ["Grounded", "Sensual", "Loyal", "Patient"],
    strengths: ["Reliability", "Patience", "Steadfastness", "Beauty"],
    challenges: ["Stubbornness", "Possessiveness", "Resistance to change"],
    luckyCrystal: "Rose Quartz",
    description:
      "Ruled by Venus, Taurus is the lover of pleasure, beauty and security. Slow to start, impossible to stop.",
  },
  {
    slug: "gemini",
    name: "Gemini",
    symbol: "♊",
    element: "Air",
    dates: "May 21 – Jun 20",
    rulingPlanet: "Mercury",
    traits: ["Curious", "Witty", "Adaptable", "Communicative"],
    strengths: ["Versatility", "Intellect", "Charm", "Storytelling"],
    challenges: ["Restlessness", "Inconsistency", "Overthinking"],
    luckyCrystal: "Citrine",
    description:
      "The cosmic communicator. Gemini's mind moves at the speed of light — endlessly curious, endlessly clever.",
  },
  {
    slug: "cancer",
    name: "Cancer",
    symbol: "♋",
    element: "Water",
    dates: "Jun 21 – Jul 22",
    rulingPlanet: "Moon",
    traits: ["Nurturing", "Intuitive", "Protective", "Sentimental"],
    strengths: ["Emotional depth", "Loyalty", "Empathy", "Memory"],
    challenges: ["Moodiness", "Clinginess", "Over-sensitivity"],
    luckyCrystal: "Moonstone",
    description:
      "Ruled by the Moon, Cancer feels everything deeply. The cosmic mother — caring, intuitive, and fiercely protective of loved ones.",
  },
  {
    slug: "leo",
    name: "Leo",
    symbol: "♌",
    element: "Fire",
    dates: "Jul 23 – Aug 22",
    rulingPlanet: "Sun",
    traits: ["Radiant", "Generous", "Theatrical", "Loyal"],
    strengths: ["Confidence", "Generosity", "Creativity", "Leadership"],
    challenges: ["Pride", "Need for attention", "Drama"],
    luckyCrystal: "Citrine",
    description:
      "Born to shine. Leo's warmth, charisma and creative fire light up every room they enter.",
  },
  {
    slug: "virgo",
    name: "Virgo",
    symbol: "♍",
    element: "Earth",
    dates: "Aug 23 – Sep 22",
    rulingPlanet: "Mercury",
    traits: ["Analytical", "Practical", "Modest", "Service-oriented"],
    strengths: ["Precision", "Discipline", "Helpfulness", "Intelligence"],
    challenges: ["Perfectionism", "Self-criticism", "Worry"],
    luckyCrystal: "Amazonite",
    description:
      "The cosmic perfectionist. Virgo brings order to chaos with a sharp eye and a service-driven heart.",
  },
  {
    slug: "libra",
    name: "Libra",
    symbol: "♎",
    element: "Air",
    dates: "Sep 23 – Oct 22",
    rulingPlanet: "Venus",
    traits: ["Diplomatic", "Charming", "Aesthetic", "Fair"],
    strengths: ["Diplomacy", "Beauty", "Harmony", "Justice"],
    challenges: ["Indecision", "People-pleasing", "Avoidance"],
    luckyCrystal: "Lapis Lazuli",
    description:
      "Ruled by Venus, Libra seeks beauty, balance and partnership — the cosmic peacemaker.",
  },
  {
    slug: "scorpio",
    name: "Scorpio",
    symbol: "♏",
    element: "Water",
    dates: "Oct 23 – Nov 21",
    rulingPlanet: "Pluto, Mars",
    traits: ["Intense", "Mysterious", "Passionate", "Loyal"],
    strengths: ["Depth", "Resilience", "Magnetism", "Insight"],
    challenges: ["Jealousy", "Secretiveness", "Vengefulness"],
    luckyCrystal: "Obsidian",
    description:
      "The cosmic mystic. Scorpio dives where others fear to go — uncovering truth, transformation, and rebirth.",
  },
  {
    slug: "sagittarius",
    name: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    dates: "Nov 22 – Dec 21",
    rulingPlanet: "Jupiter",
    traits: ["Adventurous", "Optimistic", "Philosophical", "Free-spirited"],
    strengths: ["Optimism", "Vision", "Honesty", "Generosity"],
    challenges: ["Bluntness", "Restlessness", "Commitment issues"],
    luckyCrystal: "Turquoise",
    description:
      "The cosmic explorer. Sagittarius chases truth, freedom and the far horizon — bow drawn, always aiming higher.",
  },
  {
    slug: "capricorn",
    name: "Capricorn",
    symbol: "♑",
    element: "Earth",
    dates: "Dec 22 – Jan 19",
    rulingPlanet: "Saturn",
    traits: ["Disciplined", "Ambitious", "Responsible", "Patient"],
    strengths: ["Discipline", "Strategy", "Endurance", "Achievement"],
    challenges: ["Workaholism", "Pessimism", "Rigidity"],
    luckyCrystal: "Garnet",
    description:
      "The cosmic architect. Capricorn builds slowly, patiently, brick by brick — toward a legacy that lasts.",
  },
  {
    slug: "aquarius",
    name: "Aquarius",
    symbol: "♒",
    element: "Air",
    dates: "Jan 20 – Feb 18",
    rulingPlanet: "Uranus, Saturn",
    traits: ["Visionary", "Independent", "Humanitarian", "Eccentric"],
    strengths: ["Originality", "Vision", "Independence", "Innovation"],
    challenges: ["Aloofness", "Stubbornness", "Detachment"],
    luckyCrystal: "Amethyst",
    description:
      "The cosmic rebel. Aquarius sees a future no one else can see yet — and quietly builds it.",
  },
  {
    slug: "pisces",
    name: "Pisces",
    symbol: "♓",
    element: "Water",
    dates: "Feb 19 – Mar 20",
    rulingPlanet: "Neptune, Jupiter",
    traits: ["Dreamy", "Empathic", "Artistic", "Spiritual"],
    strengths: ["Compassion", "Intuition", "Creativity", "Mysticism"],
    challenges: ["Escapism", "Over-sensitivity", "Boundaries"],
    luckyCrystal: "Aquamarine",
    description:
      "The cosmic dreamer. Pisces lives where dreams, intuition and the unseen world meet — soft, deep, and impossibly perceptive.",
  },
];

export function getSign(slug: string): ZodiacSign | undefined {
  return ZODIAC.find((s) => s.slug === slug);
}
