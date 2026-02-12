import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const prods = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const products = prods.map((p) => ({
      ...p,
      price: Number(p.price),
      promoPrice: p.promoPrice ? Number(p.promoPrice) : null,
    }));

    const filteredProds = products.map((p) => {
      return {
        product: {
          id: p.id,
          title: p.name === "..." || p.name === "" ? "No name" : p.name,
          description: p.description,
          images: [p.image],
          category: p.category,
          type: p.type,
          price: p.price,
          stock: p.stock,
          brand: p.brand,
          discountPercentage: 0,
          currency: p.currency,
          target: p.target,
          origin: p.origin,
        },
        shop: {
          id: crypto.randomUUID(),
          name: p.shopName,
          logo: p.shopLogo,
          contact: p.whatsapp,
        },
        url: "",
      };
    });

    return NextResponse.json(
      {
        data: filteredProds ?? [],
        message: "Donnees envoyées",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Erreur GET /products/get :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur", data: [] },
      { status: 500 },
    );
  }
}
