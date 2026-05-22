import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider, SectionTag } from "@/components/ui";
import { CRYSTALS, getCrystal } from "@/lib/crystals";
import { formatINR } from "@/lib/utils";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return CRYSTALS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/shop/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const c = getCrystal(slug);
  if (!c) return {};
  return {
    title: `${c.name} — ${c.benefit}`,
    description: c.longDescription,
    alternates: { canonical: `/shop/${c.slug}` },
    openGraph: {
      title: `${c.name} — Moonspell Coven`,
      description: c.benefit,
      url: `${SITE.url}/shop/${c.slug}`,
    },
  };
}

export default async function CrystalDetailPage(
  props: PageProps<"/shop/[slug]">,
) {
  const { slug } = await props.params;
  const c = getCrystal(slug);
  if (!c) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.name,
    description: c.longDescription,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: c.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/shop/${c.slug}`,
    },
  };

  return (
    <>
      <section className="px-[5%] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/shop"
            className="mb-6 inline-block text-[12px] uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-gold"
          >
            ← Shop All Crystals
          </Link>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex h-64 items-center justify-center border border-border-faint bg-purple-mid text-[110px] sm:h-80 sm:text-[140px] md:h-[480px] md:text-[180px]">
              {c.emoji}
            </div>

            <div>
              {c.badge && (
                <span className="mb-3 inline-block bg-purple-accent px-2 py-[3px] font-display text-[10px] tracking-[0.1em] text-gold-light">
                  {c.badge}
                </span>
              )}
              <SectionTag>{c.chakra} Chakra</SectionTag>
              <h1 className="mb-4 text-[clamp(1.8rem,6vw,3rem)] leading-[1.15]">
                {c.name}
              </h1>
              <p className="mb-6 text-[13px] uppercase tracking-[0.2em] text-text-muted sm:text-[14px]">
                {c.benefit}
              </p>
              <div className="mb-8 font-display text-[26px] text-gold sm:text-[32px]">
                {formatINR(c.price)}
              </div>
              <p className="mb-8 text-[15px] leading-[1.9] text-text-muted">
                {c.longDescription}
              </p>

              <button
                type="button"
                className="mb-10 w-full bg-gold px-10 py-4 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light sm:w-auto"
              >
                Add to Cart
              </button>

              <dl className="grid grid-cols-2 gap-5 border-t border-border-faint pt-8 text-[13px] sm:gap-6">
                <div>
                  <dt className="mb-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                    Best For
                  </dt>
                  <dd className="text-text-muted">{c.properties.join(", ")}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                    Zodiac
                  </dt>
                  <dd className="text-text-muted">{c.zodiac.join(", ")}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                    Chakra
                  </dt>
                  <dd className="text-text-muted">{c.chakra}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                    Origin
                  </dt>
                  <dd className="text-text-muted">{c.origin}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className="bg-purple-dark px-[5%] py-14 sm:py-20">
        <h2 className="mb-10 text-center text-[clamp(1.5rem,5vw,2.2rem)] sm:mb-12">
          You May Also Love
        </h2>
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {CRYSTALS.filter((x) => x.slug !== c.slug)
            .slice(0, 3)
            .map((x) => (
              <Link
                key={x.slug}
                href={`/shop/${x.slug}`}
                className="block border border-border-faint bg-purple-mid p-6 text-center transition-colors hover:border-gold"
              >
                <div className="mb-4 text-[56px]">{x.emoji}</div>
                <div className="font-display text-[14px] tracking-[0.08em]">
                  {x.name}
                </div>
                <div className="mt-2 font-display text-[14px] text-gold">
                  {formatINR(x.price)}
                </div>
              </Link>
            ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
