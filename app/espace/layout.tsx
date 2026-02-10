import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

async function layout({ children }: Props) {
  const user = await getUser();

  if (!user) return redirect("/auth/connection");

  return <div className="min-h-screen">{children}</div>;
}

export default layout;
