import Link from "next/link";
import type { Crystal } from "@/lib/crystals-db";

// Server-rendered form. `action` is a server action bound by the parent page.
export function CrystalForm({
  action,
  crystal,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  crystal?: Crystal;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5 border border-border-faint bg-purple-dark p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" defaultValue={crystal?.name} required />
        <Field
          label="Slug (optional)"
          name="slug"
          defaultValue={crystal?.slug}
          placeholder="auto-generated from name"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-[120px_1fr]">
        <Field label="Emoji" name="emoji" defaultValue={crystal?.emoji} />
        <Field
          label="Benefit (short tagline)"
          name="benefit"
          defaultValue={crystal?.benefit}
          required
        />
      </div>

      <Textarea
        label="Long Description"
        name="longDescription"
        defaultValue={crystal?.longDescription}
        required
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <Field
          label="Price (₹)"
          name="price"
          type="number"
          defaultValue={crystal?.price?.toString()}
          required
        />
        <Field label="Chakra" name="chakra" defaultValue={crystal?.chakra} required />
        <Field
          label="Badge"
          name="badge"
          defaultValue={crystal?.badge ?? ""}
          placeholder="Bestseller / New"
        />
      </div>

      <Field
        label="Properties (comma-separated)"
        name="properties"
        defaultValue={crystal?.properties.join(", ")}
        placeholder="Love, Calm, Protection"
      />
      <Field
        label="Zodiac (comma-separated)"
        name="zodiac"
        defaultValue={crystal?.zodiac.join(", ")}
        placeholder="Taurus, Libra"
      />
      <Field label="Origin" name="origin" defaultValue={crystal?.origin} />

      <label className="flex items-center gap-3 text-[13px] text-text-muted">
        <input
          type="checkbox"
          name="published"
          defaultChecked={crystal?.published ?? true}
          className="h-4 w-4 accent-gold"
        />
        Published (visible in shop)
      </label>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          className="bg-gold px-8 py-3 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/crystals"
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
  required,
}: {
  label: string;
  name: string;
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
      <textarea
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        rows={5}
        className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] text-text-base focus:border-gold focus:outline-none"
      />
    </div>
  );
}
