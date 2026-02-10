"use client";
import { addProduct, uploadProductImage } from "@/actions/products";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductAddInput } from "@/schema/products";
import { Categories, Currencies, Targets } from "@/utils/data";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("vetements");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [target, setTarget] = useState("unisex");
  const [stock, setStock] = useState(1);
  const [whatsapp, setWhatsapp] = useState("");
  const [shopName, setShopName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  //   DISABLE BUTTON LOGIC
  const isButtonDisabled = useMemo(() => {
    return (
      !name ||
      price < 0 ||
      !category ||
      !type ||
      !target ||
      stock < 0 ||
      !whatsapp ||
      !shopName ||
      loading
    );
  }, [name, price, category, type, target, stock, whatsapp, shopName, loading]);

  //   SUBMIT HANDLER

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData: ProductAddInput = {
        name: name.toLocaleLowerCase().trim(),
        description: description.trim() || undefined,
        price,
        currency,
        category,
        type,
        brand,
        target,
        stock,
        whatsapp,
        shopName,
      };

      const result = await addProduct(formData);

      if (result.error) {
        toast.error(result.message);
        return;
      }

      //   SEND VERCEL BLOB
      if (image && result.newproductId) {
        const newproductId = result.newproductId;
        const data = new FormData();
        data.append("image", image);
        data.append("id", newproductId);

        const imageRes = await uploadProductImage(data);

        if (imageRes.error) {
          console.log(imageRes.message);
          toast.warning(imageRes.message || "Impossible d'ajouter cette image");
        }
      }

      toast.success("Produit ajouté avec succès !");
      // reset form
      setName("");
      setDescription("");
      setPrice(0);
      setCurrency("USD");
      setCategory("vetements");
      setType("");
      setBrand("");
      setTarget("unisex");
      setStock(1);
      setWhatsapp("");
      setShopName("");
      setImage(null);
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error(
        "Une erreur est survenue lors de l'ajout du produit. Veuillez réessayer.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-8 border rounded mt-4">
      {/* image */}
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <Label htmlFor="image">
          Image du produit <strong className="text-destructive">*</strong>
        </Label>

        {/* Image in Rectangle  borders */}
        <div
          className="max-w-52 w-full h-48 border-2 border-dashed rounded flex items-center justify-center cursor-pointer relative overflow-hidden"
          onClick={() => {
            const fileInput = document.getElementById(
              "image",
            ) as HTMLInputElement | null;
            fileInput?.click();
          }}
        >
          {image ? (
            <div className="relative w-full h-full">
              <Image
                src={URL.createObjectURL(image)}
                alt="Product Image"
                className="object-cover w-full h-full"
                priority
                fill
              />
              {/* remove img button */}
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500/70 
                text-white rounded-full py-1 px-2.5 opacity-75 
                hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                }}
              >
                X
              </button>
            </div>
          ) : (
            <span className="text-gray-400 text-center text-xs">
              Cliquez pour ajouter une image
            </span>
          )}
          <input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const MAX_SIZE = 1024 * 1024; // 1MB

              // vérification taille
              if (file.size > MAX_SIZE) {
                toast.error("L'image ne doit pas dépasser 1MB");
                e.target.value = ""; // reset input file
                return;
              }

              // vérification type (recommandé)
              if (!file.type.startsWith("image/")) {
                toast.error("Le fichier doit être une image");
                e.target.value = "";
                return;
              }

              setImage(file);
            }}
            required
          />
        </div>
      </div>

      {/* name */}
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="name">
          Nom du produit <strong className="text-destructive">*</strong>
        </Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="ex: Chemise Zara longues manches"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          required
        />
      </div>

      {/* description */}
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="ex: Chemise Zara longues manches en coton, taille M, couleur bleue."
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      {/* price & currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* price */}
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="price">
            Prix <strong className="text-destructive">*</strong>
          </Label>
          <Input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border rounded px-3 py-2"
            placeholder="ex: 25.99"
            min={0}
            required
          />
        </div>

        {/* currency */}
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="currency">Devise</Label>
          <SelectComponent
            options={Currencies}
            value={currency}
            onChange={setCurrency}
            placeholder="Sélectionnez une devise"
            className="w-full"
            required
            disabled={loading}
          />
        </div>
      </div>

      {/* category */}
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="category">
          Catégorie <strong className="text-destructive">*</strong>
        </Label>
        <SelectComponent
          options={Categories}
          value={category}
          onChange={setCategory}
          placeholder="Sélectionnez une catégorie"
          className="w-full"
          required
          disabled={loading}
        />
      </div>

      {/* type */}
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="type">
          Type <strong className="text-destructive">*</strong>
        </Label>
        <Input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="ex: Chemise, Pantalon, Sac à main..."
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          required
        />
      </div>

      {/* target & brand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* target */}
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="target">
            Cible <strong className="text-destructive">*</strong>
          </Label>
          <SelectComponent
            options={Targets}
            value={target}
            onChange={setTarget}
            placeholder="Sélectionnez une cible"
            className="w-full"
            required
            disabled={loading}
          />{" "}
        </div>

        {/* brand */}
        <div className="grid grid-cols-1 gap-2">
          <Label htmlFor="brand">Marque</Label>
          <Input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border rounded px-3 py-2"
            placeholder="ex: Zara, Nike, Adidas..."
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </div>

      {/* stock */}
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="stock">
          Stock (Quantité) <strong className="text-destructive">*</strong>
        </Label>
        <Input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border rounded px-3 py-2"
          placeholder="ex: 10"
          min={0}
          required
        />
      </div>

      {/* whatsapp */}
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="whatsapp">
          Contact WhatsApp <strong className="text-destructive">*</strong>
        </Label>
        <Input
          type="text"
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="ex: 0812345678"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          required
          maxLength={10}
        />
      </div>

      {/* shop name */}
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="shopName">
          Nom de la boutique <strong className="text-destructive">*</strong>
        </Label>
        <Input
          type="text"
          id="shopName"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="ex: Boutique de Marie"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          required
        />
      </div>

      {/* button */}
      <div className="mt-2">
        <Button
          type="submit"
          disabled={isButtonDisabled}
          className="w-full  py-2 px-4 "
          onClick={() => handleSubmit()}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </div>
  );
};

export default AddProductForm;
