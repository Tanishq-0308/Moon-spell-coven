import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PageHero } from "@/components/ui";

export default async function AdminDashboardPage() {
  const session = await auth();

  const [bookingCount, subscriberCount, userCount] = await Promise.all([
    db.booking.count(),
    db.subscriber.count(),
    db.user.count(),
  ]);

  return (
    <>
      <PageHero
        tag="Admin"
        title="Dashboard"
        subtitle={`Signed in as ${session?.user?.name ?? "Admin"}`}
      />
      <section className="px-[5%] pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          <Stat label="Bookings" value={bookingCount} href="/admin/bookings" />
          <Stat label="Subscribers" value={subscriberCount} />
          <Stat label="Users" value={userCount} />
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-4">
          <Link
            href="/admin/products"
            className="border border-gold px-6 py-3 font-display text-[12px] uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-deep"
          >
            Manage Products
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href?: string;
}) {
  const inner = (
    <div className="border border-border-faint bg-purple-dark p-8 text-center transition-colors hover:border-gold">
      <div className="font-display text-[40px] text-gold">{value}</div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
        {label}
      </div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
