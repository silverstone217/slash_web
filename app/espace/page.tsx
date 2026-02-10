import { getProducts } from "@/actions/products";
import { getUser } from "@/actions/user";
import { columns } from "@/components/espace/lists/colums";
import { DataTable } from "@/components/espace/lists/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

async function page() {
  const user = await getUser();

  if (!user) return null;

  const products = await getProducts();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-1">Votre Espace personnel</h1>
      <p className="text-xs max-w-md mb-4">
        Ici, visualisez vos produits ajoutés, modifier les ou supprimer les
        facilement et rapidement.
      </p>

      {/* ADD BTN */}
      <Link href="/espace/ajouter" className="">
        <Button size="sm" className="py-3 px-8 w-full sm:w-fit">
          Ajouter un produit
        </Button>
      </Link>

      {/* Lists */}
      <div className="mt-10 flex flex-col">
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}

export default page;
