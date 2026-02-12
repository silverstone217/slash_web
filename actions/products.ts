"use server";

import { ProductAddInput, ProductAddSchema } from "@/schema/products";
import { getUser } from "./user";
import { Category, Currency, Target } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";

// ADD PRODUCT
export const addProduct = async (formData: ProductAddInput) => {
  try {
    // is user authenticated ? if not throw error
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        newproductId: null,
        message: "Vous devez être connecté pour ajouter un produit.",
      };
    }

    // is user banned ? if yes throw error
    if (user.isBanned) {
      return {
        error: true,
        newproductId: null,
        message:
          "Votre compte a été suspendu. Vous ne pouvez pas ajouter de produits.",
      };
    }

    // validate formData with zod schema
    const revalidated = ProductAddSchema.safeParse(formData);

    // if validation fails, throw error with message
    if (!revalidated.success) {
      const errorMessages = revalidated.error.issues
        .map((err) => err.message)
        .join(", ");
      return {
        error: true,
        newproductId: null,
        message: `Mauvaise validation : ${errorMessages}`,
      };
    }

    // create product in database
    const newProduct = await prisma.product.create({
      data: {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        currency: formData.currency as Currency,
        category: formData.category as Category,
        type: formData.type,
        target: formData.target as Target,
        stock: formData.stock,
        brand: formData.brand ?? undefined,
        whatsapp: formData.whatsapp,
        shopName: formData.shopName,
        userId: user.id,
      },
    });

    console.log("New product added:", newProduct.id);
    return {
      error: false,
      newproductId: newProduct.id,
      message: "Produit ajouté avec succès !",
    };
  } catch (error) {
    console.log("Error adding product:", error);
    return {
      error: true,
      newproductId: null,
      message:
        "Une erreur est survenue lors de l'ajout du produit. Veuillez réessayer.",
    };
  }
};

// UPLOAD IMAGE
export const uploadProductImage = async (formData: FormData) => {
  try {
    const imageFile = formData.get("image") as File;
    const productId = formData.get("id") as string;

    // validation basique
    if (!imageFile || imageFile.size === 0) {
      return {
        error: true,
        message: "L'image est obligatoire",
        data: null,
      };
    }

    // validation type fichier (important)
    if (!imageFile.type.startsWith("image/")) {
      return {
        error: true,
        message: "Le fichier doit être une image",
        newproductId: null,
      };
    }

    // clé unique blob (évite collision)
    const filename = `products/${crypto.randomUUID()}`;

    // upload vercel blob
    const blob = await put(filename, imageFile, {
      access: "public",
    });

    // update prisma
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { image: blob.url },
    });

    revalidatePath("/products");

    return {
      error: false,
      message: "Image uploadée avec succès",
      newproductId: updatedProduct.id,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      error: true,
      message: "Erreur lors de l'upload de l'image",
      newproductId: null,
    };
  }
};

// GET PRODUCTS

export const getProducts = async () => {
  const user = await getUser();
  if (!user) return [];

  const prods = await prisma.product.findMany({
    where: { userId: user.id },
  });

  const products = prods.map((p) => ({
    ...p,
    price: Number(p.price),
    promoPrice: p.promoPrice ? Number(p.promoPrice) : null,
  }));

  return products ?? [];
};

// DELETE PRODUCT
export const deleteProductById = async (id: string) => {
  try {
    // auth user
    const user = await getUser();
    if (!user || user.isBanned) {
      return {
        error: true,
        message: "Vous n'etes pas authentifié ou vous avez été bloqué!",
      };
    }

    // get product
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product)
      return {
        error: true,
        message: "Produit introuvalbe",
      };

    // check owner
    if (product.userId !== user.id) {
      return {
        error: true,
        message: "Non autorisé",
      };
    }

    // delete prod
    await prisma.product.delete({
      where: {
        id,
      },
    });

    // delete image to vercel blob
    if (
      product.image !==
      "https://3eqaz12yan4rgf7v.public.blob.vercel-storage.com/products/noimage.png"
    ) {
      await deleteImage(product.image);
    }

    revalidatePath("/espace");
    return {
      error: false,
      message: "Produit supprimé!",
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Impossible de supprimer",
    };
  }
};

// DELETE IMG
export async function deleteImage(imageUrl: string) {
  await del(imageUrl);
}
