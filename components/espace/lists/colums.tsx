"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ActionList from "./ActionList";
import { ProductSerialized } from "@/types/products";

export const columns: ColumnDef<ProductSerialized>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      const nbr = row.index + 1;

      return <div className="text-left font-medium">{nbr}</div>;
    },
  },

  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const prod = row.original;

      return (
        <Image
          src={prod.image}
          alt={`${prod.name + " image"}`}
          priority={true}
          width={40}
          height={40}
          className="object-cover rounded-sm size-10"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const prod = row.original;
      return (
        <span className="capitalize font-medium w-36 truncate line-clamp-2">
          {prod.name}
        </span>
      );
    },
  },
  {
    accessorKey: "stock",
    header: () => <span className="text-center">Quantité</span>,
    cell: ({ row }) => {
      const prod = row.original;
      return <span className="text-center">{prod.stock}</span>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Prix</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const currency = row.original.currency;

      const formatted = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: currency,
      }).format(amount);

      return <div className="text-right font-semibold">{formatted}</div>;
    },
  },

  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center justify-end">
          <ActionList product={product} />
        </div>
      );
    },
  },
];
