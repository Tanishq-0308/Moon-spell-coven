import type { Metadata } from "next";
import { ButtonLink, Divider, PageHero, SectionTag } from "@/components/ui";

export const metadata: Metadata = {
  title: "About — Moonspell Coven",
  description:
    "Meet Moonspell Coven — astrologers and crystal healers offering honest, compassionate Vedic guidance. 3 years of practice, 500+ readings, 4.9★ rating.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="Our Story"
        title="Ancient Wisdom For Modern Souls"
        subtitle="Moonspell Coven was born from a simple belief — that the stars whisper truths, and that anyone willing to listen can transform their life."
      />

      <section className="px-[5%] py-14 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-6 text-[15px] leading-[1.9] text-text-muted sm:text-[16px]">
          <p>
            We are practicing astrologers, tarot readers, and crystal healers
            trained in the Vedic tradition. Our work is grounded in honesty —
            no fear-mongering, no fake remedies, no false promises.
          </p>
          <p>
            Every reading we offer comes from a place of compassion and a deep
            respect for the human journey. Your chart is not a sentence — it&apos;s
            a map. And our job is simply to help you read it.
          </p>
          <p>
            Over the last three years, we&apos;ve been honoured to guide more than
            500 souls through life transitions, relationship questions, career
            crossroads, and the quiet personal moments in between.
          </p>
        </div>
      </section>

      <Divider />

      <section className="bg-purple-dark px-[5%] py-14 sm:py-20">
        <SectionTag>Our Values</SectionTag>
        <h2 className="mb-10 text-center text-[clamp(1.5rem,5vw,2.5rem)] sm:mb-14">
          What We Stand For
        </h2>
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {[
            {
              icon: "✦",
              title: "Honesty",
              text: "We never sugar-coat or scare. Truthful guidance, even when difficult.",
            },
            {
              icon: "✦",
              title: "No Remedies Hustle",
              text: "We don't push expensive gemstones or pujas. If we suggest something, it's because you actually need it.",
            },
            {
              icon: "✦",
              title: "Compassion",
              text: "Every chart is held with empathy. Your story matters as much as your stars.",
            },
            {
              icon: "✦",
              title: "Authenticity",
              text: "Crystals are sourced directly, energised under the moon, never mass-produced.",
            },
            {
              icon: "✦",
              title: "Confidentiality",
              text: "Everything you share with us stays between us. Always.",
            },
            {
              icon: "✦",
              title: "Inclusivity",
              text: "Astrology for everyone — regardless of background, gender, or belief.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="border border-border-faint bg-purple-mid p-6 sm:p-7"
            >
              <div className="mb-3 text-[24px] text-gold">{v.icon}</div>
              <h3 className="mb-3 text-[15px] tracking-[0.08em] text-gold">
                {v.title}
              </h3>
              <p className="text-[13px] leading-[1.7] text-text-muted">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="px-[5%] py-14 text-center sm:py-20">
        <h2 className="mb-6 text-[clamp(1.5rem,5vw,2.2rem)]">
          Ready to begin your journey?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-[14px] leading-[1.8] text-text-muted">
          Book a consultation and let&apos;s read your stars together.
        </p>
        <ButtonLink href="/book">Book a Reading</ButtonLink>
      </section>
    </>
  );
}
