"use client";

import { updateProduct, uploadProductImage } from "@/actions/products";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductModifyInput } from "@/schema/products";
import { ProductSerialized } from "@/types/products";
import { Categories, Currencies, Targets } from "@/utils/data";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type Props = {
  product: ProductSerialized;
};

const ModifyProductForm = ({ product }: Props) => {
  const [name, setName] = useState(product.name ?? "");
  const [description, setDescription] = useState(product.description ?? "");
  const [price, setPrice] = useState(product.price ?? 0);
  const [currency, setCurrency] = useState(product.currency ?? "USD");
  const [category, setCategory] = useState(product.category ?? "vetements");
  const [type, setType] = useState(product.type ?? "");
  const [brand, setBrand] = useState(product.brand ?? "");
  const [target, setTarget] = useState(product.target ?? "unisex");
  const [stock, setStock] = useState(product.stock ?? 1);
  const [whatsapp, setWhatsapp] = useState(product.whatsapp ?? "");
  const [shopName, setShopName] = useState(product.shopName ?? "");

  const [image, setImage] = useState<File | null>(null);
  const [visualizedImage, setVisualizedImage] = useState(product.image);

  const [loading, setLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // disable main submit
  const isButtonDisabled = useMemo(() => {
    if (
      name === product.name &&
      description === product.description &&
      price === product.price &&
      currency === product.currency &&
      stock === product.stock &&
      shopName === product.shopName &&
      whatsapp === product.whatsapp &&
      target === product.target &&
      brand === product.brand &&
      category === product.category &&
      type === product.type
    )
      return true;

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
  }, [
    name,
    product.name,
    product.description,
    product.price,
    product.currency,
    product.stock,
    product.shopName,
    product.whatsapp,
    product.target,
    product.brand,
    product.category,
    product.type,
    description,
    price,
    currency,
    stock,
    shopName,
    whatsapp,
    target,
    brand,
    category,
    type,
    loading,
  ]);

  //   update visualized img
  useEffect(() => {
    if (image) {
      setVisualizedImage(URL.createObjectURL(image));
    }
  }, [image]);

  // UPDATE PRODUCT INFOS
  const handleUpdateProduct = async () => {
    setLoading(true);

    try {
      const formData: ProductModifyInput = {
        name: name.toLowerCase().trim(),
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
        id: product.id,
      };

      const result = await updateProduct(formData);

      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success("Produit modifié avec succès !");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la modification du produit");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE IMAGE ONLY
  const handleUpdateImage = async () => {
    if (!image) return;

    setIsImageLoading(true);

    try {
      const data = new FormData();
      data.append("image", image);
      data.append("id", product.id);

      const res = await uploadProductImage(data);

      if (res.error) {
        toast.error(res.message);
        return;
      }

      toast.success("Image mise à jour !");
      setVisualizedImage(URL.createObjectURL(image));
      setImage(null);
    } catch (error) {
      console.log(error);
      toast.error("Erreur upload image");
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-8 border rounded mt-4">
      {/* IMAGE */}
      <div className="flex flex-col items-center gap-3">
        <Label>Image du produit</Label>

        <div
          className="max-w-52 w-full h-48 border-2 border-dashed rounded flex items-center justify-center cursor-pointer relative overflow-hidden"
          onClick={() =>
            (document.getElementById("image") as HTMLInputElement)?.click()
          }
        >
          {visualizedImage ? (
            <div className="relative w-full h-full">
              <Image
                src={image ? URL.createObjectURL(image) : visualizedImage}
                alt="product"
                fill
                className="object-cover"
                priority
              />
              {/* remove img button */}({" "}
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500/70 
                text-white rounded-full py-1 px-2.5 opacity-75 
                hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  if (image) setImage(null);
                  else setVisualizedImage("");
                }}
              >
                X
              </button>
              )
            </div>
          ) : (
            <span className="text-xs text-gray-400">Ajouter une image</span>
          )}

          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              if (file.size > 1024 * 1024) {
                toast.error("Image doit avoir moins d'un 1MB");
                return;
              }

              setImage(file);
            }}
          />
        </div>

        <Button disabled={!image || isImageLoading} onClick={handleUpdateImage}>
          {isImageLoading ? "Upload..." : "Mettre à jour l'image"}
        </Button>
      </div>

      {/* OTHER INFOS */}
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
            onChange={setCurrency as (value: string) => void}
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
          onChange={setCategory as (value: string) => void}
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
            onChange={setTarget as (value: string) => void}
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

      <Button disabled={isButtonDisabled} onClick={handleUpdateProduct}>
        {loading ? "Modification..." : "Modifier le produit"}
      </Button>
    </div>
  );
};

export default ModifyProductForm;
