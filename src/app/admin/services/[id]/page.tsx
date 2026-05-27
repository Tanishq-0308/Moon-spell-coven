import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { getServiceById } from "@/lib/services-db";
import { ServiceForm } from "../service-form";
import { updateService } from "../actions";

export default async function EditServicePage(
  props: PageProps<"/admin/services/[id]">,
) {
  const { id } = await props.params;
  const service = await getServiceById(id);
  if (!service) notFound();

  const action = updateService.bind(null, id);

  return (
    <>
      <PageHero tag="Admin · Services" title={`Edit ${service.name}`} />
      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-3xl">
          <ServiceForm
            action={action}
            service={service}
            submitLabel="Save Changes"
          />
        </div>
      </section>
    </>
  );
}
