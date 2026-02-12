import { Product } from "@/lib/generated/prisma/client";

export type ProductSerialized = Omit<Product, "price" | "promoPrice"> & {
  price: number;
  promoPrice: number | null;
};
