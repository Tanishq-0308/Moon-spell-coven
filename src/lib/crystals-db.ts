import { cache } from "react";
import { db } from "@/lib/db";
import type { CrystalModel } from "@/generated/prisma/models";

export type Crystal = CrystalModel;

// `cache` dedupes calls within a single request (e.g. page + generateMetadata).

export const getPublishedCrystals = cache(async () => {
  return db.crystal.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });
});

export const getAllCrystals = cache(async () => {
  return db.crystal.findMany({ orderBy: { createdAt: "asc" } });
});

export const getCrystalBySlug = cache(async (slug: string) => {
  return db.crystal.findUnique({ where: { slug } });
});

export const getCrystalById = cache(async (id: string) => {
  return db.crystal.findUnique({ where: { id } });
});
