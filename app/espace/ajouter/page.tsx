import { getUser } from "@/actions/user";
import AvatarUser from "@/components/AvatarUser";
import AddProductForm from "@/components/espace/ajouter/AddProductForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

async function page() {
  const user = await getUser();

  if (!user) return null;

  return (
    <div>
      {/* HEADER */}
      <header className="p-4 border-b-2 shadow flex items-center justify-between">
        {/* link  */}
        <Link
          href={"/"}
          className=" flex items-center group 
             text-sm"
        >
          <ArrowLeft className="mr-2 inline-block" />
          <span
            className="text-sm
                group-hover:text-gray-400 transition-all duration-300
                ease-in-out
            "
          >
            Retour
          </span>
        </Link>

        {/* user avatar */}
        <AvatarUser fallback={user.name} src={user.image} />
      </header>

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
