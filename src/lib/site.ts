export const SITE = {
  name: "Moonspell Coven",
  tagline: "Astrology & Spiritual Guidance",
  description:
    "Discover your destiny through ancient Vedic astrology, sacred crystals, and personalised spiritual guidance. Birth chart readings, tarot, crystals & rituals.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://moonspell.example.com",
  email: "hello@moonspell.example.com",
  social: {
    instagram: "https://instagram.com/moonspell",
    youtube: "https://youtube.com/@moonspell",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/horoscopes", label: "Horoscopes" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;
