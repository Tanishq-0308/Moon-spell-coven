import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { getCrystalById } from "@/lib/crystals-db";
import { CrystalForm } from "../crystal-form";
import { updateCrystal } from "../actions";

export default async function EditCrystalPage(
  props: PageProps<"/admin/crystals/[id]">,
) {
  const { id } = await props.params;
  const crystal = await getCrystalById(id);
  if (!crystal) notFound();

  // Bind the id so the form's action has the right signature: (formData) => void
  const action = updateCrystal.bind(null, id);

  return (
    <>
      <PageHero tag="Admin · Crystals" title={`Edit ${crystal.name}`} />
      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-3xl">
          <CrystalForm
            action={action}
            crystal={crystal}
            submitLabel="Save Changes"
          />
        </div>
      </section>
    </>
  );
}
