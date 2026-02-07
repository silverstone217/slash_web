"use client";
import { rubik } from "@/lib/fonts";
import { HomeLinks } from "@/utils/links";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import SmallScreenMenuNav from "./SmallScreenMenuNav";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 border-b-2 shadow z-40
      bg-white/60 backdrop-blur-md
    "
    >
      <div
        className="w-full flex items-center gap-6 justify-between p-4
      "
      >
        {/* Links */}
        <nav className="md:flex items-center gap-4 hidden">
          {HomeLinks.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 
                hover:text-gray-900 transition"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl lg:text-4xl font-bold ${rubik.className}`}
        >
          Slash
        </Link>

        {/* actions */}

        <div className="flex items-center gap-4">
          {/* BIG Screen button add */}
          <Link href="/espace/ajouter" className="hidden md:block">
            <Button size="sm">Ajouter un produit</Button>
          </Link>
          {/* mini button add */}
          {/* <Button size="sm" className="md:hidden">
            <Plus className="size-7" />
          </Button> */}

          {/* small menu button */}
          <div className="md:hidden">
            <SmallScreenMenuNav />
          </div>

          {/* SIGN OUT / UP */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline" size="sm" className="hidden md:block">
                Se connecter
              </Button>
            </SignInButton>
            {/* <SignUpButton></SignUpButton> */}
          </SignedOut>

          {/* SIGN IN */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
