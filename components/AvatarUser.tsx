"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarUserProps = {
  src?: string | null;
  fallback?: string | null;
};

const AvatarUser = ({ src, fallback }: AvatarUserProps) => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const initials = fallback ? getInitials(fallback) : "U";

  return (
    <Avatar
      className="
    border bg-black/10 text-white group
    hover:bg-black/20 transition cursor-pointer
     overflow-hidden
    "
    >
      {src && (
        <AvatarImage
          src={src}
          className="
      group-hover:scale-110 transition-all duration-300 ease-in-out
      "
        />
      )}
      <AvatarFallback className="font-bold">{initials}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarUser;
