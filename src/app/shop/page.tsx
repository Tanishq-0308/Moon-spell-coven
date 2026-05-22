import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { CRYSTALS } from "@/lib/crystals";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Crystal Shop — Genuine Healing Crystals",
  description:
    "Shop genuine, energised healing crystals — Rose Quartz, Amethyst, Black Tourmaline, Clear Quartz, Citrine, Selenite. Cleansed under the full moon before dispatch.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        tag="Crystal Shop"
        title="Sacred Crystals For Every Journey"
        subtitle="Genuine crystals sourced with intention. Each is cleansed under the full moon and packed with a personalised intention card."
      />

      <section className="px-[5%] pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {CRYSTALS.map((c) => (
            <Link
              key={c.slug}
              href={`/shop/${c.slug}`}
              className="group block overflow-hidden border border-border-faint bg-purple-mid transition-all hover:-translate-y-1 hover:border-gold"
            >
              <div className="flex h-56 items-center justify-center bg-purple-light text-[80px]">
                {c.emoji}
              </div>
              <div className="p-6">
                {c.badge && (
                  <span className="mb-3 inline-block bg-purple-accent px-2 py-[3px] font-display text-[10px] tracking-[0.1em] text-gold-light">
                    {c.badge}
                  </span>
                )}
                <div className="mb-1 font-display text-[16px] tracking-[0.08em]">
                  {c.name}
                </div>
                <div className="mb-4 text-[13px] leading-[1.5] text-text-muted">
                  {c.benefit}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[17px] text-gold">
                    {formatINR(c.price)}
                  </span>
                  <span className="border border-gold px-3 py-1 font-display text-[11px] tracking-[0.1em] text-gold transition-colors group-hover:bg-gold group-hover:text-deep">
                    View
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
