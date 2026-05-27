import { ButtonLink } from "@/components/ui";

export default function BookingConfirmedPage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-[5%] py-20 text-center">
      <div className="mb-6 text-[80px]">✨</div>
      <h1 className="mb-4 text-[clamp(1.8rem,4vw,3rem)]">
        Booking Received!
      </h1>
      <p className="mx-auto mb-8 max-w-md text-[15px] leading-[1.8] text-text-muted">
        Thank you for reaching out. We&apos;ll confirm your session within 24 hours
        over WhatsApp.
      </p>
      <ButtonLink href="/">Back to Home</ButtonLink>
    </section>
  );
}
