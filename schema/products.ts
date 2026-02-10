import { z } from "zod";

export const ProductAddSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis"),
  description: z.string().optional(),

  price: z
    .number({ message: "Le prix doit être un nombre" })
    .positive("Le prix doit être supérieur à zéro"),

  currency: z.string().min(1, "La devise est requise"),

  category: z.string().min(1, "La catégorie est requise"),
  type: z.string().min(1, "Le type est requis"),
  target: z.string().min(1, "La cible est requise"),

  stock: z
    .number({ message: "Le stock doit être un nombre" })
    .int("Le stock doit être un nombre entier")
    .nonnegative("Le stock ne peut pas être négatif"),

  brand: z.string().optional(),

  whatsapp: z
    .string()
    .min(1, "Le contact WhatsApp est requis")
    .regex(
      /^0\d{9}$/,
      "Le contact WhatsApp doit être un numéro congolais valide (10 chiffres commençant par 0)",
    ),

  shopName: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.string().min(1, "Le nom de la boutique est requis").optional(),
  ),
});

export type ProductAddInput = z.infer<typeof ProductAddSchema>;
