"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

// Turn a name into a url-safe slug: "Rose Quartz" -> "rose-quartz"
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Split a comma-separated input into a clean string array.
function parseList(input: string) {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function readForm(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const customSlug = (formData.get("slug") as string)?.trim();
  return {
    name,
    slug: customSlug ? slugify(customSlug) : slugify(name),
    emoji: (formData.get("emoji") as string)?.trim() || "🔮",
    benefit: (formData.get("benefit") as string)?.trim(),
    longDescription: (formData.get("longDescription") as string)?.trim(),
    price: Number(formData.get("price")),
    badge: ((formData.get("badge") as string)?.trim() || null) as string | null,
    properties: parseList((formData.get("properties") as string) ?? ""),
    zodiac: parseList((formData.get("zodiac") as string) ?? ""),
    chakra: (formData.get("chakra") as string)?.trim(),
    origin: (formData.get("origin") as string)?.trim(),
    published: formData.get("published") === "on",
  };
}

export async function createCrystal(formData: FormData) {
  await requireAdmin();
  const data = readForm(formData);

  if (!data.name || !data.benefit || !data.chakra || Number.isNaN(data.price)) {
    throw new Error("Name, benefit, chakra and a valid price are required.");
  }

  await db.crystal.create({ data });

  revalidatePath("/shop");
  revalidatePath("/admin/crystals");
  redirect("/admin/crystals");
}

export async function updateCrystal(id: string, formData: FormData) {
  await requireAdmin();
  const data = readForm(formData);

  await db.crystal.update({ where: { id }, data });

  revalidatePath("/shop");
  revalidatePath(`/shop/${data.slug}`);
  revalidatePath("/admin/crystals");
  redirect("/admin/crystals");
}

export async function deleteCrystal(id: string) {
  await requireAdmin();
  await db.crystal.delete({ where: { id } });

  revalidatePath("/shop");
  revalidatePath("/admin/crystals");
}
