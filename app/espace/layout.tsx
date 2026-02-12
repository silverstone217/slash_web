import { getUser } from "@/actions/user";
import AvatarUser from "@/components/AvatarUser";
import ReturnButton from "@/components/espace/ReturnButton";
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
    <div className="min-h-screen w-full">
      {/* HEADER */}
      <header className="p-4 border-b-2 shadow flex items-center justify-between w-full">
        {/* link  */}
        <ReturnButton />

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
