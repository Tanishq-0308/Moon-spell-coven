import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Divider, SectionTag } from "@/components/ui";
import {
  getServiceBySlug,
  getPublishedServices,
  type ServiceFaq,
} from "@/lib/services-db";
import { formatINR } from "@/lib/utils";
import { SITE } from "@/lib/site";

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} — ${formatINR(service.price)}`,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — Moonspell Coven`,
      description: service.description,
      url: `${SITE.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  // faqs is stored as JSON; cast it to the known shape for rendering.
  const faqs = (service.faqs as ServiceFaq[] | null) ?? [];
  const others = (await getPublishedServices()).filter(
    (s) => s.slug !== service.slug,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <section className="relative overflow-hidden px-[5%] py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(107,63,160,0.25)_0%,transparent_65%)]" />
        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/services"
            className="mb-6 inline-block text-[12px] uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-gold"
          >
            ← All Services
          </Link>
          <div className="mb-6 text-[48px] sm:text-[64px]">{service.icon}</div>
          <SectionTag>{service.tagline}</SectionTag>
          <h1 className="mb-6 text-[clamp(1.8rem,6vw,3.5rem)] leading-[1.15]">
            {service.name}
          </h1>
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="font-display text-[20px] text-gold sm:text-[24px]">
              {formatINR(service.price)}
            </div>
            <div className="text-[12px] uppercase tracking-[0.2em] text-text-muted sm:text-[13px]">
              {service.duration}
            </div>
          </div>
          <p className="mb-10 max-w-3xl text-[15px] leading-[1.9] text-text-muted sm:text-[16px]">
            {service.longDescription}
          </p>
          <ButtonLink href={`/book?service=${service.slug}`}>
            Book This Session
          </ButtonLink>
        </div>
      </section>

      <Divider />

      <section className="px-[5%] py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 sm:gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-[24px] tracking-[0.08em] text-gold">
              What&apos;s Included
            </h2>
            <ul className="space-y-3">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[14px] leading-[1.7] text-text-muted"
                >
                  <span className="mt-1 text-gold">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-[24px] tracking-[0.08em] text-gold">
              Frequently Asked
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-l-2 border-gold/40 pl-4">
                  <div className="mb-1 font-display text-[14px] tracking-[0.05em]">
                    {faq.q}
                  </div>
                  <p className="text-[13px] leading-[1.7] text-text-muted">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className="bg-purple-dark px-[5%] py-14 sm:py-20">
        <h2 className="mb-10 text-center text-[clamp(1.5rem,5vw,2.2rem)] sm:mb-12">
          Other Services
        </h2>
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="block border border-border-faint bg-purple-mid p-6 transition-colors hover:border-gold"
            >
              <div className="mb-3 text-[32px]">{s.icon}</div>
              <h3 className="mb-2 text-[14px] tracking-[0.08em] text-gold">
                {s.name}
              </h3>
              <div className="font-display text-[14px] text-text-base">
                {formatINR(s.price)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
