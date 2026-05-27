import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import {
  getPublishedProducts,
  CATEGORY_LABELS,
  ProductCategory,
} from "@/lib/products-db";
import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop — Crystals, Spell Kits & Spiritual Goods",
  description:
    "Shop genuine crystals, hand-crafted spell kits, affirmation guides and gift sets. Each item energised with intention and cleansed under the full moon.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage(props: PageProps<"/shop">) {
  const searchParams = await props.searchParams;
  const activeRaw = searchParams.category;
  const active = (Array.isArray(activeRaw) ? activeRaw[0] : activeRaw) ?? "all";

  const products = await getPublishedProducts();

  // Only show category chips that actually have products.
  const usedCategories = Array.from(
    new Set(products.map((p) => p.category)),
  ) as ProductCategory[];

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        tag="Shop"
        title="Sacred Goods For Every Journey"
        subtitle="Genuine crystals, spell kits and spiritual tools — sourced with intention and cleansed under the full moon."
      />

      <section className="px-[5%] pb-16 sm:pb-24">
        {usedCategories.length > 1 && (
          <div className="mx-auto mb-10 flex max-w-6xl flex-wrap justify-center gap-3">
            <CategoryChip label="All" href="/shop" active={active === "all"} />
            {usedCategories.map((c) => (
              <CategoryChip
                key={c}
                label={CATEGORY_LABELS[c]}
                href={`/shop?category=${c}`}
                active={active === c}
              />
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-center text-[14px] text-text-muted">
            No products available yet. Check back soon. ✦
          </p>
        ) : (
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/shop/${p.slug}`}
                className="group block overflow-hidden border border-border-faint bg-purple-mid transition-all hover:-translate-y-1 hover:border-gold"
              >
                <ProductImage
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-56"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="p-6">
                  {p.badge && (
                    <span className="mb-3 inline-block bg-purple-accent px-2 py-[3px] font-display text-[10px] tracking-[0.1em] text-gold-light">
                      {p.badge}
                    </span>
                  )}
                  <div className="mb-1 font-display text-[16px] tracking-[0.08em]">
                    {p.name}
                  </div>
                  <div className="mb-4 text-[13px] leading-[1.5] text-text-muted">
                    {p.benefit}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[17px] text-gold">
                      {formatINR(p.price)}
                    </span>
                    <span className="border border-gold px-3 py-1 font-display text-[11px] tracking-[0.1em] text-gold transition-colors group-hover:bg-gold group-hover:text-deep">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function CategoryChip({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "border px-5 py-2 font-display text-[11px] uppercase tracking-[0.15em] transition-colors",
        active
          ? "border-gold bg-gold text-deep"
          : "border-border-faint text-text-muted hover:border-gold hover:text-gold",
      )}
    >
      {label}
    </Link>
  );
}
