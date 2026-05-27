import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { SERVICES } from "@/lib/services";
import { formatINR } from "@/lib/utils";
import { submitBooking } from "./actions";

export const metadata: Metadata = {
  title: "Book a Reading — Astrology Consultation",
  description:
    "Book your Vedic astrology, tarot, or crystal healing session with Moonspell Coven. Personalised consultations over Zoom or WhatsApp.",
  alternates: { canonical: "/book" },
};

export default async function BookPage(props: PageProps<"/book">) {
  const searchParams = await props.searchParams;
  const preselectedRaw = searchParams.service;
  const preselected = Array.isArray(preselectedRaw)
    ? preselectedRaw[0]
    : preselectedRaw;

  return (
    <>
      <PageHero
        tag="Book a Reading"
        title="Begin Your Spiritual Journey"
        subtitle="Fill in the details below and we'll confirm your session within 24 hours."
      />

      <section className="px-[5%] pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <aside>
            <h2 className="mb-6 text-[18px] tracking-[0.08em] text-gold">
              Choose a Service
            </h2>
            <div className="space-y-3">
              {SERVICES.map((s) => (
                <div
                  key={s.slug}
                  className={`border p-4 transition-colors ${
                    preselected === s.slug
                      ? "border-gold bg-purple-mid"
                      : "border-border-faint bg-purple-dark"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="font-display text-[13px] tracking-[0.08em] text-gold">
                      {s.icon} {s.shortName}
                    </div>
                    <div className="font-display text-[13px]">
                      {formatINR(s.price)}
                    </div>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-text-muted">
                    {s.duration}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <form action={submitBooking} className="space-y-5 border border-border-faint bg-purple-dark p-6 sm:p-8">
            <h2 className="mb-2 text-[18px] tracking-[0.08em] text-gold">
              Your Details
            </h2>

            <FormField label="Full Name" name="name" type="text" required />
            <FormField label="Email" name="email" type="email" required />
            <FormField label="WhatsApp Number" name="phone" type="tel" required />

            <FormSelect
              label="Service"
              name="service"
              defaultValue={preselected ?? ""}
              options={[
                { value: "", label: "Choose a service…" },
                ...SERVICES.map((s) => ({ value: s.slug, label: s.name })),
              ]}
              required
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Date of Birth" name="dob" type="date" required />
              <FormField
                label="Time of Birth"
                name="tob"
                type="time"
                required
              />
            </div>
            <FormField
              label="Place of Birth (city, country)"
              name="pob"
              type="text"
              required
            />

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold">
                Your Question (optional)
              </label>
              <textarea
                name="question"
                rows={4}
                className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] text-text-base placeholder:text-text-muted/60 focus:border-gold focus:outline-none"
                placeholder="Anything specific you'd like guidance on…"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold py-4 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light"
            >
              Request Booking
            </button>
            <p className="text-center text-[11px] text-text-muted">
              We&apos;ll confirm your slot within 24 hours via WhatsApp.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function FormField({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] text-text-base placeholder:text-text-muted/60 focus:border-gold focus:outline-none"
      />
    </div>
  );
}

function FormSelect({
  label,
  name,
  options,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] text-text-base focus:border-gold focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
