import { PageHero } from "@/components/ui";
import { ProductForm } from "../product-form";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <>
      <PageHero tag="Admin · Products" title="Add Product" />
      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-3xl">
          <ProductForm action={createProduct} submitLabel="Create Product" />
        </div>
      </section>
    </>
  );
}
