// app/actions/products.ts
"use server";

import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma"; // Ton instance Prisma
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const imageFile = formData.get("image") as File;
  const productId = formData.get("id") as string;

  if (!imageFile || imageFile.size === 0) {
    throw new Error("Image requise");
  }

  // 1. Upload vers Vercel Blob
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });

  // 2. Enregistrement dans Prisma avec l'URL retournée (blob.url)
  const newProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      image: blob.url,
    },
  });

  revalidatePath("/products");
  return newProduct;
}
