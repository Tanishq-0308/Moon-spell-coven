import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Get In Touch",
  description:
    "Have a question? Reach out to Moonspell Coven via email or WhatsApp. We typically respond within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <PageHero
        tag="Get In Touch"
        title="Let's Connect"
        subtitle="Have a question or want to share feedback? We'd love to hear from you."
      />

      <section className="px-[5%] pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-10">
          <div className="space-y-6 border border-border-faint bg-purple-dark p-6 sm:p-8">
            <h2 className="text-[18px] tracking-[0.08em] text-gold">Reach Us</h2>

            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                Email
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="text-[15px] text-text-base hover:text-gold"
              >
                {SITE.email}
              </a>
            </div>

            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                Response Time
              </div>
              <p className="text-[14px] text-text-muted">
                We typically reply within 24 hours, Monday to Saturday.
              </p>
            </div>

            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-gold">
                Follow
              </div>
              <div className="space-x-4 text-[14px]">
                <a
                  href={SITE.social.instagram}
                  className="text-text-muted hover:text-gold"
                >
                  Instagram
                </a>
                <a
                  href={SITE.social.youtube}
                  className="text-text-muted hover:text-gold"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <form className="space-y-5 border border-border-faint bg-purple-dark p-6 sm:p-8">
            <h2 className="text-[18px] tracking-[0.08em] text-gold">
              Send a Message
            </h2>

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold">
                Message
              </label>
              <textarea
                rows={5}
                required
                className="w-full border border-border-faint bg-purple-mid px-4 py-3 text-[14px] focus:border-gold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold py-4 font-display text-[12px] uppercase tracking-[0.15em] text-deep transition-colors hover:bg-gold-light"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
