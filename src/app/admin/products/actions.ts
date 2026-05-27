"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductCategory } from "@/generated/prisma/enums";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseList(input: string) {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function readForm(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const customSlug = (formData.get("slug") as string)?.trim();
  const categoryRaw = (formData.get("category") as string)?.trim();
  const category = (
    Object.values(ProductCategory) as string[]
  ).includes(categoryRaw)
    ? (categoryRaw as ProductCategory)
    : ProductCategory.OTHER;

  return {
    name,
    slug: customSlug ? slugify(customSlug) : slugify(name),
    category,
    imageUrl: ((formData.get("imageUrl") as string)?.trim() || null) as
      | string
      | null,
    benefit: (formData.get("benefit") as string)?.trim(),
    longDescription: (formData.get("longDescription") as string)?.trim(),
    price: Number(formData.get("price")),
    badge: ((formData.get("badge") as string)?.trim() || null) as string | null,
    properties: parseList((formData.get("properties") as string) ?? ""),
    zodiac: parseList((formData.get("zodiac") as string) ?? ""),
    chakra: ((formData.get("chakra") as string)?.trim() || null) as
      | string
      | null,
    origin: ((formData.get("origin") as string)?.trim() || null) as
      | string
      | null,
    published: formData.get("published") === "on",
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const data = readForm(formData);

  if (!data.name || !data.benefit || Number.isNaN(data.price)) {
    throw new Error("Name, benefit and a valid price are required.");
  }

  await db.product.create({ data });

  revalidatePath("/shop");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const data = readForm(formData);

  await db.product.update({ where: { id }, data });

  revalidatePath("/shop");
  revalidatePath(`/shop/${data.slug}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await db.product.delete({ where: { id } });

  revalidatePath("/shop");
  revalidatePath("/admin/products");
}
