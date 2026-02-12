import { getUser } from "@/actions/user";
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

  return <div>page {id}</div>;
}

export default page;
