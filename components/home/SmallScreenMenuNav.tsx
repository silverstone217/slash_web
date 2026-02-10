"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { RiMenu3Fill } from "react-icons/ri";
import { HomeLinks } from "@/utils/links";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useCurrentUser } from "@/hooks/UserAuth";
import AvatarUser from "../AvatarUser";

const SmallScreenMenuNav = () => {
  const user = useCurrentUser();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <RiMenu3Fill className="size-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full flex flex-col gap-4">
        <PopoverHeader>
          {/* login / logout */}
          {user ? (
            <div className="flex items-center gap-2">
              <AvatarUser src={user.image} fallback={user.name} />
              <div>
                <PopoverTitle className="font-semibold">
                  {user?.name || "USER"}
                </PopoverTitle>
                <PopoverDescription className="text-xs text-gray-400">
                  {user?.email || "user@example.com"}
                </PopoverDescription>
              </div>
            </div>
          ) : (
            <Link href="/auth/connection">
              <Button variant="outline" size="sm">
                Se connecter
              </Button>
            </Link>
          )}
        </PopoverHeader>

        <Separator />
        {/* Links */}
        <nav className="w-full flex flex-col gap-2">
          {HomeLinks.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 
                  hover:text-gray-900 transition
                    flex items-center gap-2 py-1.5
                  "
              >
                <link.icon className="size-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <Separator />

        <Link href="/espace/ajouter" className="w-full">
          <Button className="w-full">Ajouter un produit</Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default SmallScreenMenuNav;
