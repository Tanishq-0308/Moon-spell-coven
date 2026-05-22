import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border-faint bg-deep px-[5%] pt-12 pb-8">
      <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-[16px] tracking-[0.15em] text-gold">
            {SITE.name}
          </div>
          <p className="mt-4 max-w-[260px] text-[13px] leading-[1.8] text-text-muted">
            Ancient wisdom for modern souls. We offer genuine astrology, crystal
            healing and spiritual guidance with honesty and care.
          </p>
        </div>

        <FooterCol
          title="Services"
          links={[
            { href: "/services/birth-chart-reading", label: "Birth Chart Reading" },
            { href: "/services/tarot-card-reading", label: "Tarot Reading" },
            { href: "/services/love-and-protection-spells", label: "Love Spells" },
            { href: "/services/personalised-affirmations", label: "Affirmations" },
          ]}
        />
        <FooterCol
          title="Shop"
          links={[
            { href: "/shop", label: "All Crystals" },
            { href: "/services/love-and-protection-spells", label: "Spell Kits" },
            { href: "/services/personalised-affirmations", label: "Affirmation PDFs" },
            { href: "/shop", label: "Gift Sets" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { href: "/about", label: "About Us" },
            { href: "/blog", label: "Blog" },
            { href: "/contact", label: "Contact" },
            { href: "/horoscopes", label: "Horoscopes" },
          ]}
        />
      </div>

      <div className="flex flex-col items-start justify-between gap-3 border-t border-border-faint pt-6 md:flex-row md:items-center">
        <p className="text-[12px] text-text-muted">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p className="max-w-[500px] text-[11px] leading-[1.6] text-text-muted/60 md:text-right">
          For entertainment and spiritual guidance purposes only. Results are not
          guaranteed and may vary. We do not claim to provide medical, legal or
          financial advice.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-gold">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-[13px] text-text-muted transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
