import { getProductById } from "@/actions/products";
import { getUser } from "@/actions/user";
import ModifyProductForm from "@/components/espace/modifier/ModifyProductForm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function page({ params }: Props) {
  const user = await getUser();
  const { id } = await params;

  if (!user) return null;
  if (!id) return redirect("/espace");

  const product = await getProductById(id);

  if (!product) return;

  return (
    <div>
      {/* container */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-1 line-clamp-3">
          Modifier <span className="capitalize">{product.name}</span>
        </h1>
        <p className="text-xs max-w-md mb-4">
          Ici, vous pouvez modifier un produit de votre boutique. Remplissez ou
          corriger les informations nécessaires et cliquez sur{" "}
          <strong>Valider</strong> pour sauvergarder les informations corrigées.
        </p>
        {/* form */}
        <ModifyProductForm product={product} />
      </div>
    </div>
  );
}

export default page;
