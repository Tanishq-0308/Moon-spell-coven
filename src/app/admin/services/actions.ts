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

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseList(input: string) {
  return input
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

// FAQs entered as "question | answer" per line.
function parseFaqs(input: string) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [q, ...rest] = line.split("|");
      return { q: q.trim(), a: rest.join("|").trim() };
    })
    .filter((f) => f.q && f.a);
}

function readForm(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const customSlug = (formData.get("slug") as string)?.trim();
  return {
    name,
    slug: customSlug ? slugify(customSlug) : slugify(name),
    shortName: ((formData.get("shortName") as string)?.trim() || null) as
      | string
      | null,
    icon: ((formData.get("icon") as string)?.trim() || null) as string | null,
    tagline: (formData.get("tagline") as string)?.trim(),
    description: (formData.get("description") as string)?.trim(),
    longDescription: (formData.get("longDescription") as string)?.trim(),
    price: Number(formData.get("price")),
    duration: (formData.get("duration") as string)?.trim(),
    includes: parseList((formData.get("includes") as string) ?? ""),
    faqs: parseFaqs((formData.get("faqs") as string) ?? ""),
    published: formData.get("published") === "on",
  };
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const data = readForm(formData);

  if (!data.name || !data.tagline || !data.duration || Number.isNaN(data.price)) {
    throw new Error("Name, tagline, duration and a valid price are required.");
  }

  await db.service.create({ data });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const data = readForm(formData);

  await db.service.update({ where: { id }, data });

  revalidatePath("/services");
  revalidatePath(`/services/${data.slug}`);
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await db.service.delete({ where: { id } });

  revalidatePath("/services");
  revalidatePath("/admin/services");
}
