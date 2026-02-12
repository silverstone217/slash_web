"use client";

import { isCuid } from "@/utils/functions";
import { usePathname } from "next/navigation";
import React from "react";

const UrlPage = () => {
  const pathname = usePathname();

  const lastSegment = pathname.split("/").filter(Boolean).pop();

  const label = isCuid(lastSegment) ? "Produit" : lastSegment;

  return (
    <span className="capitalize font-bold text-xl lg:text-2xl">{label}</span>
  );
};

export default UrlPage;
