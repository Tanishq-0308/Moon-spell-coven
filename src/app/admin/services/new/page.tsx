import { PageHero } from "@/components/ui";
import { ServiceForm } from "../service-form";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <>
      <PageHero tag="Admin · Services" title="Add Service" />
      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-3xl">
          <ServiceForm action={createService} submitLabel="Create Service" />
        </div>
      </section>
    </>
  );
}
