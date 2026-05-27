import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Divider, SectionTag } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import { getProductBySlug, getPublishedProducts } from "@/lib/products-db";
import { formatINR } from "@/lib/utils";
import { SITE } from "@/lib/site";

export async function generateMetadata(
  props: PageProps<"/shop/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const p = await getProductBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.benefit}`,
    description: p.longDescription,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: {
      title: `${p.name} — Moonspell Coven`,
      description: p.benefit,
      url: `${SITE.url}/shop/${p.slug}`,
      images: p.imageUrl ? [p.imageUrl] : undefined,
    },
  };
}

export default async function ProductDetailPage(
  props: PageProps<"/shop/[slug]">,
) {
  const { slug } = await props.params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const others = (await getPublishedProducts())
    .filter((x) => x.slug !== p.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.longDescription,
    image: p.imageUrl ?? undefined,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/shop/${p.slug}`,
    },
  };

  const hasAttributes =
    p.chakra || p.origin || p.properties.length > 0 || p.zodiac.length > 0;

  return (
    <>
      <section className="px-[5%] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/shop"
            className="mb-6 inline-block text-[12px] uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-gold"
          >
            ← Shop All Products
          </Link>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <ProductImage
              src={p.imageUrl}
              alt={p.name}
              priority
              className="h-64 border border-border-faint sm:h-80 md:h-[480px]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div>
              {p.badge && (
                <span className="mb-3 inline-block bg-purple-accent px-2 py-[3px] font-display text-[10px] tracking-[0.1em] text-gold-light">
                  {p.badge}
                </span>
              )}
              {p.chakra && <SectionTag>{p.chakra} Chakra</SectionTag>}
              <h1 className="mb-4 text-[clamp(1.8rem,6vw,3rem)] leading-[1.15]">
                {p.name}
              </h1>
              <p className="mb-6 text-[13px] uppercase tracking-[0.2em] text-text-muted sm:text-[14px]">
                {p.benefit}
              </p>
              <div className="mb-8 font-display text-[26px] text-gold sm:text-[32px]">
                {formatINR(p.price)}
              </div>
              <p className="mb-8 text-[15px] leading-[1.9] text-text-muted">
                {p.longDescription}
              </p>

              <button
                type="button"
                className="mb-10 w-full bg-gold px-10 py-4 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light sm:w-auto"
              >
                Add to Cart
              </button>

              {hasAttributes && (
                <dl className="grid grid-cols-2 gap-5 border-t border-border-faint pt-8 text-[13px] sm:gap-6">
                  {p.properties.length > 0 && (
                    <Attr label="Best For" value={p.properties.join(", ")} />
                  )}
                  {p.zodiac.length > 0 && (
                    <Attr label="Zodiac" value={p.zodiac.join(", ")} />
                  )}
                  {p.chakra && <Attr label="Chakra" value={p.chakra} />}
                  {p.origin && <Attr label="Origin" value={p.origin} />}
                </dl>
              )}
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <>
          <Divider />
          <section className="bg-purple-dark px-[5%] py-14 sm:py-20">
            <h2 className="mb-10 text-center text-[clamp(1.5rem,5vw,2.2rem)] sm:mb-12">
              You May Also Love
            </h2>
            <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {others.map((x) => (
                <Link
                  key={x.id}
                  href={`/shop/${x.slug}`}
                  className="group block overflow-hidden border border-border-faint bg-purple-mid transition-colors hover:border-gold"
                >
                  <ProductImage
                    src={x.imageUrl}
                    alt={x.name}
                    className="h-44"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="p-5 text-center">
                    <div className="font-display text-[14px] tracking-[0.08em]">
                      {x.name}
                    </div>
                    <div className="mt-2 font-display text-[14px] text-gold">
                      {formatINR(x.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

function Attr({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-1 text-[11px] uppercase tracking-[0.2em] text-gold">
        {label}
      </dt>
      <dd className="text-text-muted">{value}</dd>
    </div>
  );
}
