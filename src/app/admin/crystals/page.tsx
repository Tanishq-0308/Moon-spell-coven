import Link from "next/link";
import { getAllCrystals } from "@/lib/crystals-db";
import { formatINR } from "@/lib/utils";
import { PageHero } from "@/components/ui";
import { DeleteCrystalButton } from "./delete-button";

export default async function AdminCrystalsPage() {
  const crystals = await getAllCrystals();

  return (
    <>
      <PageHero tag="Admin · Crystals" title="Manage Crystals" />

      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[13px] text-text-muted">
              {crystals.length} crystal{crystals.length !== 1 ? "s" : ""}
            </p>
            <Link
              href="/admin/crystals/new"
              className="bg-gold px-6 py-3 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light"
            >
              + Add Crystal
            </Link>
          </div>

          <div className="divide-y divide-border-faint border border-border-faint">
            {crystals.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-4 bg-purple-dark p-4"
              >
                <div className="text-[32px]">{c.emoji}</div>
                <div className="flex-1">
                  <div className="font-display text-[15px] tracking-[0.05em]">
                    {c.name}
                    {!c.published && (
                      <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-text-muted/60">
                        (hidden)
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-text-muted">
                    {formatINR(c.price)} · {c.chakra}
                  </div>
                </div>
                <Link
                  href={`/admin/crystals/${c.id}`}
                  className="border border-border-faint px-4 py-2 font-display text-[11px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  Edit
                </Link>
                <DeleteCrystalButton id={c.id} name={c.name} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
