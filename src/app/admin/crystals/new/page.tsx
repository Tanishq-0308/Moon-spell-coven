import { PageHero } from "@/components/ui";
import { CrystalForm } from "../crystal-form";
import { createCrystal } from "../actions";

export default function NewCrystalPage() {
  return (
    <>
      <PageHero tag="Admin · Crystals" title="Add Crystal" />
      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-3xl">
          <CrystalForm action={createCrystal} submitLabel="Create Crystal" />
        </div>
      </section>
    </>
  );
}
