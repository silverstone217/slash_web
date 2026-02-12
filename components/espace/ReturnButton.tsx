"use client";
import { isCuid } from "@/utils/functions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ReturnButton = () => {
  const pathname = usePathname();

  const lastSegment = pathname.split("/").filter(Boolean).pop();

  const label = isCuid(lastSegment) ? "Produit" : lastSegment;

  const isEspace = label === "espace";

  return (
    <Link
      href={isEspace ? "/" : "/espace"}
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
  );
};

export default ReturnButton;
