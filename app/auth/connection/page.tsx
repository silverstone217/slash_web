import { rubik } from "@/lib/fonts";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthForm from "./AuthForm";
import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";

async function page() {
  const user = await getUser();
  if (user) return redirect("/");

  return (
    <div className="p-4">
      <Image
        src={
          "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="connection background with products and people"
        width={1000}
        height={1000}
        priority
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 -z-10"
      />
      {/* TOP */}
      <h1
        className={`text-4xl font-bold mb-4 text-white
      
         ${rubik.className}`}
      >
        Slash.
      </h1>

      {/* Form */}
      <div className="p-4 mx-auto max-w-md w-full min-h-72 mt-10 lg:mt-16 flex flex-col gap-8">
        <div className="text-white flex flex-col gap-1">
          {/* link  */}
          <Link
            href={"/"}
            className=" flex items-center group 
            text-gray-300 text-sm"
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

          {/* title */}
          <div className="mt-4 px-2">
            <h2 className="text-3xl font-bold">Bienvenue sur Slash.</h2>
            <p className="text-gray-300 text-sm">
              Connectez-vous pour découvrir et partager vos produits préférés
              avec la communauté.
            </p>
          </div>
        </div>

        {/* form */}
        <AuthForm />
      </div>
    </div>
  );
}

export default page;
