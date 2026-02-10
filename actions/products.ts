"use server";

import { ProductAddInput, ProductAddSchema } from "@/schema/products";
import { getUser } from "./user";
import { Category, Currency, Target } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

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
