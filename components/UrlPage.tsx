"use client";

import { usePathname } from "next/navigation";
import React from "react";

const UrlPage = () => {
  const pathname = usePathname();

  const lastSegment = pathname
    .split("/")
    .filter(Boolean) // enlève les ""
    .pop(); // prend le dernier mot

  const label = lastSegment;

  return (
    <span className="capitalize font-bold text-xl lg:text-2xl">{label}</span>
  );
};

export default UrlPage;
