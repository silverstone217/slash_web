"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

const DataImages = [
  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1675119717007-ad04bd2a9d10?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1539278383962-a7774385fa02?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Hero = () => {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % DataImages.length);
    }, 10000); // Change d'image toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="w-full grid md:grid-cols-2 max-w-7xl 
    mx-auto gap-4 md:items-center pt-6"
    >
      {/* texts and action buttons */}
      <div>
        <h1
          className={`text-4xl md:text-5xl font-bold mb-6
        text-gray-700 tracking-tight
            `}
        >
          Partagez des produits incroyables.
        </h1>

        <p className="text-gray-600 mb-8">
          Enregistrez et partagez vos produits préférés avec la communauté.
          Trouvez plus de clients et faites découvrir vos produits à un public
          plus large.
        </p>

        {/* images small screens */}
        <div className="md:hidden mb-6 w-full relative">
          <Image
            src={DataImages[index]}
            alt="Hero Image"
            width={800}
            height={600}
            className="w-full h-60 object-cover rounded-lg mb-6 md:hidden"
            priority
          />

          {/* stats */}
          <div
            className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md
        rounded-lg px-4 py-2 flex items-center gap-4 shadow-lg
        "
          >
            <div>
              <p className="text-sm text-gray-500">Produits partagés</p>
              <p className="text-lg font-bold text-gray-800">+3.5K</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Utilisateurs actifs</p>
              <p className="text-lg font-bold text-gray-800">+1.5K</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap w-full">
          <Link href="/espace/ajouter" className="w-full md:w-fit">
            <Button className="px-6 py-6 transition w-full">
              Ajouter un produit
            </Button>
          </Link>
          <Link href="#how-it-works" className="w-full md:w-fit">
            <Button variant="outline" className="px-6 py-6 transition w-full">
              Comment ça marche ?
            </Button>
          </Link>
        </div>
      </div>

      {/* images big screen*/}
      <div
        className="md:block hidden bg-secondary/80 h-72 rounded-lg shadow-lg
      relative overflow-hidden
      "
      >
        <Image
          src={DataImages[index]}
          alt="Hero Image"
          width={800}
          height={600}
          className="w-full h-full object-cover rounded-lg"
        />

        {/* stats */}
        <div
          className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md
        rounded-lg px-4 py-2 flex items-center gap-4 shadow-lg
        "
        >
          <div>
            <p className="text-sm text-gray-500">Produits partagés</p>
            <p className="text-lg font-bold text-gray-800">+3.5K</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Utilisateurs actifs</p>
            <p className="text-lg font-bold text-gray-800">+1.5K</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
