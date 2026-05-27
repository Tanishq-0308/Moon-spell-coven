import { cache } from "react";
import { db } from "@/lib/db";
import type { ServiceModel } from "@/generated/prisma/models";

export type Service = ServiceModel;

// faqs is stored as JSON in the DB; this is its shape.
export type ServiceFaq = { q: string; a: string };

// `cache` dedupes calls within a single request (e.g. page + generateMetadata).

export const getPublishedServices = cache(async () => {
  return db.service.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
  });
});

export const getAllServices = cache(async () => {
  return db.service.findMany({ orderBy: { createdAt: "asc" } });
});

export const getServiceBySlug = cache(async (slug: string) => {
  return db.service.findUnique({ where: { slug } });
});

export const getServiceById = cache(async (id: string) => {
  return db.service.findUnique({ where: { id } });
});
