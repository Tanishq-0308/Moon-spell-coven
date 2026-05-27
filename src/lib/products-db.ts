import { cache } from "react";
import { db } from "@/lib/db";
import type { ProductModel } from "@/generated/prisma/models";
import { ProductCategory } from "@/generated/prisma/enums";

export type Product = ProductModel;
export { ProductCategory };

// Human-readable labels for each category value.
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  CRYSTAL: "Crystals",
  SPELL_KIT: "Spell Kits",
  AFFIRMATION: "Affirmations",
  GIFT_SET: "Gift Sets",
  OTHER: "Other",
};

export const getPublishedProducts = cache(async () => {
  return db.product.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
});

export const getAllProducts = cache(async () => {
  return db.product.findMany({ orderBy: { createdAt: "desc" } });
});

export const getProductBySlug = cache(async (slug: string) => {
  return db.product.findUnique({ where: { slug } });
});

export const getProductById = cache(async (id: string) => {
  return db.product.findUnique({ where: { id } });
});
