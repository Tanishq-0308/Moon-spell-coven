import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, PageHero } from "@/components/ui";
import { SERVICES } from "@/lib/services";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services — Birth Chart, Tarot, Spells & Affirmations",
  description:
    "Explore all spiritual services: Vedic birth chart readings, tarot, love & protection spells, and personalised affirmations. Sessions with experienced astrologers.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="Our Services"
        title="Spiritual Guidance Tailored For You"
        subtitle="Every session is honest, compassionate, and built around your unique chart and life situation."
      />

      <section className="px-[5%] pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block border border-border-faint bg-purple-dark p-7 transition-colors hover:bg-purple-mid sm:p-8 lg:p-10"
            >
              <div className="mb-4 text-[40px]">{s.icon}</div>
              <h2 className="mb-2 text-[20px] tracking-[0.08em] text-gold">
                {s.name}
              </h2>
              <p className="mb-5 text-[14px] uppercase tracking-[0.2em] text-text-muted">
                {s.tagline}
              </p>
              <p className="mb-6 text-[14px] leading-[1.8] text-text-muted">
                {s.description}
              </p>
              <div className="flex items-center justify-between border-t border-border-faint pt-5">
                <div className="font-display text-[18px] text-text-base">
                  {formatINR(s.price)}{" "}
                  <span className="text-[12px] text-text-muted">
                    / {s.duration}
                  </span>
                </div>
                <span className="font-display text-[12px] tracking-[0.15em] text-gold">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center sm:mt-16">
          <ButtonLink href="/book">Book a Session</ButtonLink>
        </div>
      </section>
    </>
  );
}
