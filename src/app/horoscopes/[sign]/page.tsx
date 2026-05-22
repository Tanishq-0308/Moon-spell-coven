import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Divider, SectionTag } from "@/components/ui";
import { ZODIAC, getSign } from "@/lib/zodiac";

export function generateStaticParams() {
  return ZODIAC.map((s) => ({ sign: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/horoscopes/[sign]">,
): Promise<Metadata> {
  const { sign } = await props.params;
  const z = getSign(sign);
  if (!z) return {};
  return {
    title: `${z.name} Horoscope — Traits, Dates & Lucky Crystal`,
    description: `${z.name} (${z.dates}) — ${z.description} Element: ${z.element}. Ruling planet: ${z.rulingPlanet}.`,
    alternates: { canonical: `/horoscopes/${z.slug}` },
  };
}

export default async function SignPage(props: PageProps<"/horoscopes/[sign]">) {
  const { sign } = await props.params;
  const z = getSign(sign);
  if (!z) notFound();

  return (
    <>
      <section className="relative overflow-hidden px-[5%] py-14 text-center sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(107,63,160,0.25)_0%,transparent_65%)]" />
        <div className="relative">
          <Link
            href="/horoscopes"
            className="mb-6 inline-block text-[12px] uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-gold"
          >
            ← All Signs
          </Link>
          <div className="mb-4 text-[72px] leading-none text-gold sm:text-[100px]">{z.symbol}</div>
          <SectionTag>{z.dates}</SectionTag>
          <h1 className="mb-4 text-[clamp(2rem,7vw,4rem)]">{z.name}</h1>
          <p className="mx-auto max-w-2xl text-[15px] leading-[1.9] text-text-muted sm:text-[16px]">
            {z.description}
          </p>
        </div>
      </section>

      <Divider />

      <section className="px-[5%] py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          <Stat label="Element" value={z.element} />
          <Stat label="Ruling Planet" value={z.rulingPlanet} />
          <Stat label="Lucky Crystal" value={z.luckyCrystal} />
          <Stat label="Dates" value={z.dates} />
        </div>
      </section>

      <Divider />

      <section className="bg-purple-dark px-[5%] py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 sm:gap-12 md:grid-cols-3">
          <Block title="Core Traits" items={z.traits} />
          <Block title="Strengths" items={z.strengths} />
          <Block title="Challenges" items={z.challenges} />
        </div>
      </section>

      <Divider />

      <section className="px-[5%] py-14 text-center sm:py-20">
        <h2 className="mb-4 text-[clamp(1.5rem,5vw,2.2rem)]">
          Want a personal {z.name} reading?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-[14px] leading-[1.8] text-text-muted">
          Your sun sign is just the beginning. Get your full birth chart decoded.
        </p>
        <ButtonLink href="/book?service=birth-chart-reading">
          Book a Birth Chart Reading
        </ButtonLink>
      </section>

      <section className="bg-purple-dark px-[5%] py-12 sm:py-16">
        <h2 className="mb-8 text-center text-[16px] tracking-[0.1em] text-gold sm:text-[18px]">
          Explore Other Signs
        </h2>
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-3">
          {ZODIAC.filter((s) => s.slug !== z.slug).map((s) => (
            <Link
              key={s.slug}
              href={`/horoscopes/${s.slug}`}
              className="border border-border-faint bg-purple-mid px-4 py-2 text-[12px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:border-gold hover:text-gold"
            >
              {s.symbol} {s.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border-faint bg-purple-mid p-6 text-center">
      <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
        {label}
      </div>
      <div className="font-display text-[16px] tracking-[0.05em] text-gold">
        {value}
      </div>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="mb-5 text-[18px] tracking-[0.1em] text-gold">{title}</h2>
      <ul className="space-y-2">
        {items.map((i) => (
          <li
            key={i}
            className="flex gap-3 text-[14px] leading-[1.7] text-text-muted"
          >
            <span className="mt-1 text-gold/60">✦</span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
