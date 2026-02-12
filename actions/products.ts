"use server";

import {
  ProductAddInput,
  ProductAddSchema,
  ProductModifyInput,
  ProductModifySchema,
} from "@/schema/products";
import { getUser } from "./user";
import { Category, Currency, Target } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { DEFAULT_IMAGE_PRODUCT } from "@/utils/env";

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

    const validatedData = revalidated.data;

    // create product in database
    const newProduct = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        currency: validatedData.currency as Currency,
        category: validatedData.category as Category,
        type: validatedData.type,
        target: validatedData.target as Target,
        stock: validatedData.stock,
        brand: validatedData.brand ?? undefined,
        whatsapp: validatedData.whatsapp,
        shopName: validatedData.shopName,
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

// DELETE IMG
export async function deleteImage(imageUrl: string) {
  await del(imageUrl);
}

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

    // get product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product)
      return {
        error: true,
        message: "Produit introuvalbe",
      };

    // delete former image if exist
    if (product.image !== DEFAULT_IMAGE_PRODUCT) {
      await deleteImage(product.image);
    }

    // clé unique blob (évite collision)
    const filename = `products/${crypto.randomUUID()}`;

    // upload vercel blob
    const blob = await put(filename, imageFile, {
      access: "public",
    });

    // update prisma
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
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

// UPDATE PRODUCT
export const updateProduct = async (formData: ProductModifyInput) => {
  try {
    // is user authenticated ? if not throw error
    const user = await getUser();
    if (!user) {
      return {
        error: true,
        message: "Vous devez être connecté pour modifier un produit.",
      };
    }

    // is user banned ? if yes throw error
    if (user.isBanned) {
      return {
        error: true,
        message:
          "Votre compte a été suspendu. Vous ne pouvez pas modifier de produits.",
      };
    }

    // validate formData with zod schema
    const revalidated = ProductModifySchema.safeParse(formData);

    // if validation fails, throw error with message
    if (!revalidated.success) {
      const errorMessages = revalidated.error.issues
        .map((err) => err.message)
        .join(", ");
      return {
        error: true,
        message: `Mauvaise validation : ${errorMessages}`,
      };
    }

    const validatedData = revalidated.data;

    // is product exist

    const isProductExist = await prisma.product.findUnique({
      where: { id: validatedData.id },
    });

    if (!isProductExist || isProductExist.userId !== user.id) {
      return {
        error: true,
        message: `Produit a été supprimé ou vous etes non autorisé à apporter des changements`,
      };
    }

    // create product in database
    await prisma.product.update({
      where: { id: isProductExist.id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        category: validatedData.category as Category,
        type: validatedData.type,
        price: validatedData.price,
        currency: validatedData.currency as Currency,
        brand: validatedData.brand,
        shopName: validatedData.shopName,
        whatsapp: validatedData.whatsapp,
        target: validatedData.target as Target,
        stock: validatedData.stock,
      },
    });

    return {
      error: false,
      message: "Produit modifié avec succès !",
    };
  } catch (error) {
    console.log("Error modifying product:", error);
    return {
      error: true,

      message:
        "Une erreur est survenue lors de la modification du produit. Veuillez réessayer.",
    };
  }
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
    if (product.image !== DEFAULT_IMAGE_PRODUCT) {
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

// GET PRODUCT BY ID
export const getProductById = async (id: string) => {
  const user = await getUser();
  if (!user) return null;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product || product.userId !== user.id) return null;

  const serialized = {
    ...product,
    price: Number(product.price),
    promoPrice: product.promoPrice ? Number(product.promoPrice) : null,
  };

  return serialized;
};
