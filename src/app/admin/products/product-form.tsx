import Link from "next/link";
import { type Product, ProductCategory, CATEGORY_LABELS } from "@/lib/products-db";
import { ImageUpload } from "./image-upload";

export function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  product?: Product;
  submitLabel: string;
}) {
  return (
    <form
      action={action}
      className="space-y-5 border border-border-faint bg-purple-dark p-8"
    >
      <ImageUpload defaultUrl={product?.imageUrl} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" defaultValue={product?.name} required />
        <Select
          label="Category"
          name="category"
          defaultValue={product?.category ?? ProductCategory.CRYSTAL}
          options={Object.values(ProductCategory).map((c) => ({
            value: c,
            label: CATEGORY_LABELS[c],
          }))}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Slug (optional)"
          name="slug"
          defaultValue={product?.slug}
          placeholder="auto-generated from name"
        />
        <Field
          label="Badge (optional)"
          name="badge"
          defaultValue={product?.badge ?? ""}
          placeholder="Bestseller / New"
        />
      </div>

      <Field
        label="Benefit (short tagline)"
        name="benefit"
        defaultValue={product?.benefit}
        required
      />

      <Textarea
        label="Long Description"
        name="longDescription"
        defaultValue={product?.longDescription}
        required
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Price (₹)"
          name="price"
          type="number"
          defaultValue={product?.price?.toString()}
          required
        />
        <Field
          label="Chakra (crystals only)"
          name="chakra"
          defaultValue={product?.chakra ?? ""}
        />
      </div>

      <Field
        label="Properties (comma-separated, optional)"
        name="properties"
        defaultValue={product?.properties.join(", ")}
        placeholder="Love, Calm, Protection"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Zodiac (comma-separated, optional)"
          name="zodiac"
          defaultValue={product?.zodiac.join(", ")}
          placeholder="Taurus, Libra"
        />
        <Field
          label="Origin (optional)"
          name="origin"
          defaultValue={product?.origin ?? ""}
        />
      </div>

      <label className="flex items-center gap-3 text-[13px] text-text-muted">
        <input
          type="checkbox"
          name="published"
          defaultChecked={product?.published ?? true}
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
          href="/admin/products"
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

function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: { value: string; label: string }[];
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
