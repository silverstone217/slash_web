import { getUser } from "@/actions/user";
import AvatarUser from "@/components/AvatarUser";
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
        <h1 className="text-2xl font-bold mb-4">Ajouter un produit</h1>
        {/* form */}
      </div>
    </div>
  );
}

export default page;
