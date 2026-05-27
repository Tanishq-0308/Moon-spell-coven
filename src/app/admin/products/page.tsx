import Link from "next/link";
import Image from "next/image";
import { getAllProducts, CATEGORY_LABELS } from "@/lib/products-db";
import { formatINR } from "@/lib/utils";
import { PageHero } from "@/components/ui";
import { DeleteProductButton } from "./delete-button";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <PageHero tag="Admin · Products" title="Manage Products" />

      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[13px] text-text-muted">
              {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
            <Link
              href="/admin/products/new"
              className="bg-gold px-6 py-3 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light"
            >
              + Add Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="border border-border-faint bg-purple-dark p-12 text-center text-[14px] text-text-muted">
              No products yet. Click “Add Product” to create your first one.
            </div>
          ) : (
            <div className="divide-y divide-border-faint border border-border-faint">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 bg-purple-dark p-4"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-border-faint bg-purple-light">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-text-muted/60">
                        no img
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-[15px] tracking-[0.05em]">
                      {p.name}
                      {!p.published && (
                        <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-text-muted/60">
                          (hidden)
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] text-text-muted">
                      {formatINR(p.price)} · {CATEGORY_LABELS[p.category]}
                    </div>
                  </div>
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="border border-border-faint px-4 py-2 font-display text-[11px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:border-gold hover:text-gold"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton id={p.id} name={p.name} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
