"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProductById } from "@/actions/products";
import { ProductSerialized } from "@/types/products";

type Props = {
  product: ProductSerialized;
};

const ActionList = ({ product }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const isConfirmed = window.confirm(
        "Voulez-vous vraiment supprimer ce produit ?",
      );

      if (!isConfirmed) {
        return;
      }

      const result = await deleteProductById(product.id);

      if (result.error) {
        console.log("Delete erreur", result.error);
        toast.error(result.error || "impossible de supprimer");
        return;
      }

      toast.success("Supprimé avec succes");
    } catch (error) {
      console.log("Delete erreur", error);
      toast.error("impossible de supprimer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* EDIT */}
          <DropdownMenuItem
            disabled={loading}
            onClick={() => router.push(`/espace/${product.id}`)}
          >
            Modifier
          </DropdownMenuItem>

          {/* SHARE */}
          <DropdownMenuItem disabled={loading}>Partager</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          {/* DELETE */}
          <DropdownMenuItem
            disabled={loading}
            variant="destructive"
            onClick={() => handleDelete()}
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionList;
