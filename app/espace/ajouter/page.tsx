import { getUser } from "@/actions/user";
import AddProductForm from "@/components/espace/ajouter/AddProductForm";

import React from "react";

async function page() {
  const user = await getUser();

  if (!user) return null;

  return (
    <div>
      {/* container */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-1">Ajouter un produit</h1>
        <p className="text-xs max-w-md mb-4">
          Ici, vous pouvez ajouter un nouveau produit à votre boutique.
          Remplissez les informations nécessaires et cliquez sur{" "}
          <strong>Enregistrer</strong>r pour partager votre produit avec la
          communauté.
        </p>
        {/* form */}
        <AddProductForm />
      </div>
    </div>
  );
}

export default page;
