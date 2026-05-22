import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { ZODIAC } from "@/lib/zodiac";

export const metadata: Metadata = {
  title: "Horoscopes — All 12 Zodiac Signs",
  description:
    "Daily and monthly horoscopes for every zodiac sign — Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces.",
  alternates: { canonical: "/horoscopes" },
};

export default function HoroscopesIndexPage() {
  return (
    <>
      <PageHero
        tag="Horoscopes"
        title="Find Your Sign"
        subtitle="Every zodiac sign carries its own elemental signature and cosmic blueprint. Discover yours."
      />

      <section className="px-[5%] pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {ZODIAC.map((s) => (
            <Link
              key={s.slug}
              href={`/horoscopes/${s.slug}`}
              className="group flex flex-col items-center border border-border-faint bg-purple-dark p-5 text-center transition-all hover:-translate-y-1 hover:border-gold sm:p-6"
            >
              <div className="mb-3 text-[40px] text-gold transition-transform group-hover:scale-110 sm:text-[48px]">
                {s.symbol}
              </div>
              <div className="font-display text-[16px] tracking-[0.1em] text-gold">
                {s.name}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-text-muted">
                {s.dates}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-text-muted/70">
                {s.element}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
