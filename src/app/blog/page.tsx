import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Astrology Blog — Moon Phases, Zodiac & Crystals",
  description:
    "Weekly astrology guides, zodiac insights, moon phase rituals, crystal pairings and planetary transit forecasts. Deepen your spiritual knowledge.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        tag="Astrology Blog"
        title="Wisdom From The Stars"
        subtitle="Weekly guides on moon phases, zodiac transits, ritual practice and crystal pairings."
      />

      <section className="px-[5%] pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block overflow-hidden border border-border-faint bg-purple-dark transition-colors hover:border-gold/50"
            >
              <div className="flex h-48 items-center justify-center bg-purple-light text-[64px]">
                {p.emoji}
              </div>
              <div className="p-7">
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
                  {p.category}
                </div>
                <h2 className="mb-3 font-display text-[16px] leading-[1.5]">
                  {p.title}
                </h2>
                <p className="mb-4 text-[13px] leading-[1.7] text-text-muted">
                  {p.excerpt.slice(0, 110)}…
                </p>
                <div className="text-[11px] text-text-muted">
                  {p.date} · {p.readingTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
