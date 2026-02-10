"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { SiApple } from "react-icons/si";

const providers = [
  { name: "Google", Icon: FaGoogle, enabled: true, id: "google" },
  { name: "Apple", Icon: SiApple, enabled: false, id: "apple" },
  { name: "Facebook", Icon: FaFacebookF, enabled: false, id: "facebook" },
];

const AuthForm = () => {
  const handleSignIn = async (providerId: string) => {
    try {
      await signIn(providerId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="border-2 shadow-lg rounded-md flex flex-col
gap-4 px-4 py-4 sm:py-6 lg:py-8 bg-black/80 border-black w-full
  "
    >
      <div className="mt-4 text-white flex flex-col mb-1 text-center">
        <p className="text-gray-300 text-sm">
          Choisissez une méthode de connexion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        {providers.map(({ name, Icon, enabled, id }) => (
          <Button
            key={id}
            variant={enabled ? "default" : "outline"}
            disabled={!enabled}
            className="flex gap-3 items-center justify-center py-3 
                  font-semibold hover:scale-105 transition-transform"
            onClick={() => {
              if (enabled) {
                handleSignIn(id);
                console.log(`Sign in with ${name}`);
              }
            }}
            style={{
              opacity: enabled ? 1 : 0.3,
              borderColor: enabled ? "white" : "dimgrey",
              backgroundColor: enabled ? "white" : "dimgrey",
              color: enabled ? "black" : "gray",
            }}
          >
            <Icon className="w-6 h-6" aria-hidden="true" />
            <span>{name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AuthForm;
