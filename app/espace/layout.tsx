import { getUser } from "@/actions/user";
import AvatarUser from "@/components/AvatarUser";
import UrlPage from "@/components/UrlPage";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function layout({ children }: Props) {
  const user = await getUser();

  if (!user) return redirect("/auth/connection");

  return (
    <div className="min-h-screen">
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

        {/* URL */}
        <UrlPage />

        {/* user avatar */}
        <AvatarUser fallback={user.name} src={user.image} />
      </header>

      <main>{children}</main>
    </div>
  );
}

export default layout;
