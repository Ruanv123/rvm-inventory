"use client";

import { deleteProduct } from "@/_actions/product";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

export function DeleteButton({
  id,
  children,
}: PropsWithChildren<{ id: number }>) {
  async function onDelete() {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Product deletion failed");
    }
  }

  return (
    <button onClick={onDelete} className="w-full cursor-pointer">
      {children}
    </button>
  );
}
