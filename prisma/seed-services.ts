import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { SERVICES } from "../src/lib/services";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding services…");
  for (const s of SERVICES) {
    await db.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        shortName: s.shortName,
        icon: s.icon,
        tagline: s.tagline,
        description: s.description,
        longDescription: s.longDescription,
        price: s.price,
        duration: s.duration,
        includes: s.includes,
        faqs: s.faqs,
      },
      create: {
        slug: s.slug,
        name: s.name,
        shortName: s.shortName,
        icon: s.icon,
        tagline: s.tagline,
        description: s.description,
        longDescription: s.longDescription,
        price: s.price,
        duration: s.duration,
        includes: s.includes,
        faqs: s.faqs,
      },
    });
    console.log(`  ✓ ${s.name}`);
  }
  const count = await db.service.count();
  console.log(`Done. ${count} services in DB.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
