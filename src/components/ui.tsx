import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-center text-[11px] uppercase tracking-[0.35em] text-gold">
      ✦ {children} ✦
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-4 text-center text-[clamp(1.6rem,5vw,2.8rem)] leading-[1.2]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function SectionSub({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mb-10 max-w-[500px] text-center text-[14px] leading-[1.8] text-text-muted sm:mb-14">
      {children}
    </p>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-4 px-[5%]">
      <div className="h-px flex-1 bg-border-faint" />
      <div className="text-[18px] text-gold/60">✦</div>
      <div className="h-px flex-1 bg-border-faint" />
    </div>
  );
}

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "outline";
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-block px-8 py-3.5 font-display text-[12px] uppercase tracking-[0.15em] transition-colors";
  const styles =
    variant === "primary"
      ? "bg-gold text-deep hover:bg-gold-light"
      : "border border-gold bg-transparent text-gold hover:bg-gold/10";
  return (
    <Link className={cn(base, styles, className)} {...props}>
      {children}
    </Link>
  );
}

export function PageHero({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden px-[5%] py-14 text-center sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(107,63,160,0.25)_0%,transparent_65%)]" />
      <div className="relative">
        <SectionTag>{tag}</SectionTag>
        <h1 className="mx-auto max-w-3xl text-[clamp(1.8rem,7vw,3.5rem)] leading-[1.15]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-[560px] text-[14px] leading-[1.8] text-text-muted sm:mt-6 sm:text-[15px]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
