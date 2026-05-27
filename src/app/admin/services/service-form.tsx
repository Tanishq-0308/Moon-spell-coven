import Link from "next/link";
import { type Service, type ServiceFaq } from "@/lib/services-db";

export function ServiceForm({
  action,
  service,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  service?: Service;
  submitLabel: string;
}) {
  const faqs = (service?.faqs as ServiceFaq[] | null) ?? [];
  const faqsText = faqs.map((f) => `${f.q} | ${f.a}`).join("\n");

  return (
    <form
      action={action}
      className="space-y-5 border border-border-faint bg-purple-dark p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" defaultValue={service?.name} required />
        <Field
          label="Short Name"
          name="shortName"
          defaultValue={service?.shortName ?? ""}
          placeholder="e.g. Birth Chart"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-[120px_1fr]">
        <Field
          label="Icon (emoji)"
          name="icon"
          defaultValue={service?.icon ?? ""}
          placeholder="🔮"
        />
        <Field
          label="Slug (optional)"
          name="slug"
          defaultValue={service?.slug}
          placeholder="auto-generated from name"
        />
      </div>

      <Field
        label="Tagline"
        name="tagline"
        defaultValue={service?.tagline}
        required
      />
      <Field
        label="Short Description"
        name="description"
        defaultValue={service?.description}
        required
      />
      <Textarea
        label="Long Description"
        name="longDescription"
        defaultValue={service?.longDescription}
        required
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Price (₹)"
          name="price"
          type="number"
          defaultValue={service?.price?.toString()}
          required
        />
        <Field
          label="Duration"
          name="duration"
          defaultValue={service?.duration}
          placeholder="45 min session"
          required
        />
      </div>

      <Textarea
        label="What's Included (one per line)"
        name="includes"
        defaultValue={service?.includes.join("\n")}
        rows={5}
      />

      <Textarea
        label="FAQs (one per line, format: question | answer)"
        name="faqs"
        defaultValue={faqsText}
        rows={5}
      />

      <label className="flex items-center gap-3 text-[13px] text-text-muted">
        <input
          type="checkbox"
          name="published"
          defaultChecked={service?.published ?? true}
          className="h-4 w-4 accent-gold"
        />
        Published (visible on site)
      </label>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          className="bg-gold px-8 py-3 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/services"
          className="text-[12px] uppercase tracking-[0.15em] text-text-muted hover:text-gold"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] text-text-base placeholder:text-text-muted/50 focus:border-gold focus:outline-none"
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows = 4,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
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
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] text-text-base focus:border-gold focus:outline-none"
      />
    </div>
  );
}
