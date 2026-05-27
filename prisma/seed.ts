import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { CRYSTALS } from "../src/lib/crystals";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding crystals…");
  for (const c of CRYSTALS) {
    // upsert = insert if new, update if the slug already exists — safe to re-run.
    await db.crystal.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        emoji: c.emoji,
        benefit: c.benefit,
        longDescription: c.longDescription,
        price: c.price,
        badge: c.badge ?? null,
        properties: c.properties,
        zodiac: c.zodiac,
        chakra: c.chakra,
        origin: c.origin,
      },
      create: {
        slug: c.slug,
        name: c.name,
        emoji: c.emoji,
        benefit: c.benefit,
        longDescription: c.longDescription,
        price: c.price,
        badge: c.badge ?? null,
        properties: c.properties,
        zodiac: c.zodiac,
        chakra: c.chakra,
        origin: c.origin,
      },
    });
    console.log(`  ✓ ${c.name}`);
  }
  const count = await db.crystal.count();
  console.log(`Done. ${count} crystals in DB.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
