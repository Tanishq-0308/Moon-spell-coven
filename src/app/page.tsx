import Link from "next/link";
import {
  ButtonLink,
  Divider,
  SectionSub,
  SectionTag,
  SectionTitle,
} from "@/components/ui";
import { SERVICES } from "@/lib/services";
import { getPublishedProducts } from "@/lib/products-db";
import { ProductImage } from "@/components/product-image";
import { BLOG_POSTS } from "@/lib/blog";
import { formatINR } from "@/lib/utils";
import { SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Divider />
      <ServicesSection />
      <Divider />
      <ShopSection />
      <Divider />
      <Testimonials />
      <Divider />
      <BlogSection />
      <Newsletter />
      <JsonLd />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-[5%] py-12 text-center sm:min-h-[92vh] sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(107,63,160,0.25)_0%,transparent_65%),radial-gradient(ellipse_at_80%_80%,rgba(201,168,76,0.08)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px]">
        <div className="absolute inset-6 rounded-full border border-gold/[0.07] sm:inset-7 md:inset-8" />
        <div className="absolute inset-14 rounded-full border border-gold/[0.05] sm:inset-16 md:inset-20" />
      </div>

      <div className="relative">
        <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-gold sm:mb-6 sm:text-[11px] sm:tracking-[0.35em]">
          ✦ Vedic Astrology &amp; Crystal Healing ✦
        </p>
        <h1 className="mb-6 text-[clamp(2rem,8vw,5rem)] leading-[1.1]">
          Unlock the
          <br />
          <em className="not-italic text-gold">Secrets</em> of
          <br />
          Your Stars
        </h1>
        <p className="mx-auto mb-8 max-w-[480px] text-[14px] leading-[1.8] text-text-muted sm:mb-10 sm:text-[15px]">
          Discover your destiny through ancient astrology, sacred crystals, and
          personalised spiritual guidance. Your journey to clarity begins here.
        </p>
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <ButtonLink href="/book">Book Consultation</ButtonLink>
          <ButtonLink href="/shop" variant="outline">
            Explore Shop
          </ButtonLink>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-16 sm:flex sm:flex-wrap sm:justify-center sm:gap-10">
          <Stat num="130K" label="Followers" />
          <Stat num="500+" label="Readings Done" />
          <Stat num="4.9★" label="Client Rating" />
          <Stat num="3 Yrs" label="Experience" />
        </div>
      </div>
    </section>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl text-gold">{num}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-text-muted">
        {label}
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <section className="px-[5%] py-16 sm:py-20 lg:py-24">
      <SectionTag>Our Services</SectionTag>
      <SectionTitle>
        Spiritual Guidance
        <br />
        Tailored For You
      </SectionTitle>
      <SectionSub>
        Each session is deeply personal and crafted to bring you clarity, peace,
        and direction.
      </SectionSub>
      <div className="grid gap-px border border-border-faint bg-border-faint sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group block bg-purple-dark p-7 transition-colors hover:bg-purple-mid sm:p-8 lg:p-10"
          >
            <div className="mb-4 text-[28px]">{s.icon}</div>
            <h3 className="mb-2 text-[14px] tracking-[0.1em] text-gold">
              {s.name}
            </h3>
            <p className="mb-4 text-[13px] leading-[1.7] text-text-muted">
              {s.description}
            </p>
            <div className="font-display text-base text-text-base">
              {formatINR(s.price)}{" "}
              <span className="font-sans text-[11px] text-text-muted">
                / {s.duration}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <ButtonLink href="/services" variant="outline">
          See All Services
        </ButtonLink>
      </div>
    </section>
  );
}

async function ShopSection() {
  const products = (await getPublishedProducts()).slice(0, 4);
  if (products.length === 0) return null;
  return (
    <section className="bg-purple-dark px-[5%] py-16 sm:py-20 lg:py-24">
      <SectionTag>Shop</SectionTag>
      <SectionTitle>
        Sacred Goods
        <br />
        For Every Journey
      </SectionTitle>
      <SectionSub>
        Genuine crystals and spiritual tools, sourced with intention. Each item
        is cleansed under the full moon before dispatch.
      </SectionSub>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/shop/${p.slug}`}
            className="group block overflow-hidden border border-border-faint bg-purple-mid transition-all hover:-translate-y-1 hover:border-gold"
          >
            <ProductImage
              src={p.imageUrl}
              alt={p.name}
              className="h-44"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
            <div className="p-5">
              {p.badge && (
                <span className="mb-2 inline-block bg-purple-accent px-2 py-[3px] font-display text-[10px] tracking-[0.1em] text-gold-light">
                  {p.badge}
                </span>
              )}
              <div className="mb-1 font-display text-[13px] tracking-[0.08em]">
                {p.name}
              </div>
              <div className="mb-3 text-[12px] leading-[1.5] text-text-muted">
                {p.benefit}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display text-[15px] text-gold">
                  {formatINR(p.price)}
                </span>
                <span className="border border-gold px-3 py-1 font-display text-[11px] tracking-[0.1em] text-gold transition-colors group-hover:bg-gold group-hover:text-deep">
                  View
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <ButtonLink href="/shop" variant="outline">
          Shop All Crystals
        </ButtonLink>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      stars: "★★★★★",
      text: "The birth chart reading was incredibly accurate. I finally understood why I've been struggling in my career — and what steps to take. Life-changing session!",
      author: "Priya S.",
      service: "Birth Chart Reading",
    },
    {
      stars: "★★★★★",
      text: "Ordered the Rose Quartz crystal kit and it came beautifully packaged with a personalised note. The energy is so calming. Will definitely order again!",
      author: "Rohit M.",
      service: "Crystal Shop",
    },
    {
      stars: "★★★★★",
      text: "My tarot reading gave me so much clarity about my relationship. The reading was honest, compassionate and deeply insightful. Highly recommended!",
      author: "Ananya K.",
      service: "Tarot Reading",
    },
  ];

  return (
    <section className="px-[5%] py-16 sm:py-20 lg:py-24">
      <SectionTag>Client Stories</SectionTag>
      <SectionTitle>What Our Clients Say</SectionTitle>
      <SectionSub>
        Real experiences from people who found clarity and peace through our
        guidance.
      </SectionSub>
      <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
        {items.map((t) => (
          <div
            key={t.author}
            className="relative border border-border-faint bg-purple-mid p-6 sm:p-8"
          >
            <div className="absolute top-2 left-5 font-display text-[60px] leading-none text-gold/30">
              &ldquo;
            </div>
            <div className="mb-4 text-[14px] text-gold">{t.stars}</div>
            <p className="mb-6 pt-3 text-[13px] leading-[1.8] text-text-muted">
              {t.text}
            </p>
            <div className="font-display text-[12px] tracking-[0.1em] text-gold">
              {t.author}
            </div>
            <div className="mt-1 text-[11px] text-text-muted">{t.service}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="bg-purple-dark px-[5%] py-16 sm:py-20 lg:py-24">
      <SectionTag>Astrology Blog</SectionTag>
      <SectionTitle>
        Wisdom From
        <br />
        The Stars
      </SectionTitle>
      <SectionSub>
        Deepen your astrological knowledge with our weekly guides, zodiac
        insights and ritual tips.
      </SectionSub>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
        {BLOG_POSTS.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group block overflow-hidden border border-border-faint bg-purple-dark transition-colors hover:border-gold/50"
          >
            <div className="flex h-36 items-center justify-center bg-purple-light text-[48px]">
              {p.emoji}
            </div>
            <div className="p-6">
              <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold">
                {p.category}
              </div>
              <div className="mb-3 font-display text-[14px] leading-[1.5]">
                {p.title}
              </div>
              <div className="text-[11px] text-text-muted">
                {p.date} · {p.readingTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <div className="relative overflow-hidden border-y border-border-faint bg-purple-light px-[5%] py-16 text-center sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(107,63,160,0.3)_0%,transparent_70%)]" />
      <div className="relative">
        <h2 className="mb-4 text-[clamp(1.5rem,5vw,2.5rem)]">
          Get Free Weekly
          <br />
          Horoscopes
        </h2>
        <p className="mx-auto mb-8 max-w-[450px] text-[14px] leading-[1.8] text-text-muted">
          Join thousands of subscribers receiving personalised weekly horoscopes,
          moon rituals and spiritual tips directly in their inbox.
        </p>
        <form className="mx-auto flex max-w-[420px] flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <input
            type="email"
            required
            placeholder="Your email address"
            className="min-w-0 flex-1 border border-border-faint bg-white/5 px-4 py-3 text-[13px] text-text-base placeholder:text-text-muted focus:border-gold focus:outline-none sm:min-w-[220px]"
          />
          <button
            type="submit"
            className="bg-gold px-8 py-3 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-4 text-[11px] text-text-muted/70">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    sameAs: [SITE.social.instagram, SITE.social.youtube],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
