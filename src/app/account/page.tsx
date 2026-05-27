import { auth } from "@/auth";
import { PageHero } from "@/components/ui";

export default async function AccountPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <PageHero tag="Your Account" title={`Hello, ${user?.name ?? "Seeker"}`} />
      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-2xl border border-border-faint bg-purple-dark p-8">
          <dl className="space-y-4 text-[14px]">
            <Row label="Name" value={user?.name ?? "—"} />
            <Row label="Email" value={user?.email ?? "—"} />
            <Row label="Role" value={user?.role ?? "USER"} />
          </dl>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border-faint pb-3">
      <dt className="text-[11px] uppercase tracking-[0.2em] text-gold">
        {label}
      </dt>
      <dd className="text-text-muted">{value}</dd>
    </div>
  );
}
