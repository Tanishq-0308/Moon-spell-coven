import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-[5%] py-20 text-center">
      <div className="mb-6 text-[80px] text-gold/60">✦</div>
      <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)]">
        The stars couldn&apos;t find this page
      </h1>
      <p className="mx-auto mb-8 max-w-md text-[14px] leading-[1.8] text-text-muted">
        The page you&apos;re looking for has drifted beyond our cosmic map. Let&apos;s
        guide you back.
      </p>
      <ButtonLink href="/">Return Home</ButtonLink>
    </section>
  );
}
