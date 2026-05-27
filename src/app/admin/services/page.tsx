import Link from "next/link";
import { getAllServices } from "@/lib/services-db";
import { formatINR } from "@/lib/utils";
import { PageHero } from "@/components/ui";
import { DeleteServiceButton } from "./delete-button";

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <>
      <PageHero tag="Admin · Services" title="Manage Services" />

      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[13px] text-text-muted">
              {services.length} service{services.length !== 1 ? "s" : ""}
            </p>
            <Link
              href="/admin/services/new"
              className="bg-gold px-6 py-3 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light"
            >
              + Add Service
            </Link>
          </div>

          {services.length === 0 ? (
            <div className="border border-border-faint bg-purple-dark p-12 text-center text-[14px] text-text-muted">
              No services yet. Click “Add Service” to create your first one.
            </div>
          ) : (
            <div className="divide-y divide-border-faint border border-border-faint">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-4 bg-purple-dark p-4"
                >
                  <div className="text-[28px]">{s.icon ?? "✦"}</div>
                  <div className="flex-1">
                    <div className="font-display text-[15px] tracking-[0.05em]">
                      {s.name}
                      {!s.published && (
                        <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-text-muted/60">
                          (hidden)
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] text-text-muted">
                      {formatINR(s.price)} · {s.duration}
                    </div>
                  </div>
                  <Link
                    href={`/admin/services/${s.id}`}
                    className="border border-border-faint px-4 py-2 font-display text-[11px] uppercase tracking-[0.15em] text-text-muted transition-colors hover:border-gold hover:text-gold"
                  >
                    Edit
                  </Link>
                  <DeleteServiceButton id={s.id} name={s.name} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
