import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { getProductById } from "@/lib/products-db";
import { ProductForm } from "../product-form";
import { updateProduct } from "../actions";

export default async function EditProductPage(
  props: PageProps<"/admin/products/[id]">,
) {
  const { id } = await props.params;
  const product = await getProductById(id);
  if (!product) notFound();

  const action = updateProduct.bind(null, id);

  return (
    <>
      <PageHero tag="Admin · Products" title={`Edit ${product.name}`} />
      <section className="px-[5%] pb-24">
        <div className="mx-auto max-w-3xl">
          <ProductForm
            action={action}
            product={product}
            submitLabel="Save Changes"
          />
        </div>
      </section>
    </>
  );
}
