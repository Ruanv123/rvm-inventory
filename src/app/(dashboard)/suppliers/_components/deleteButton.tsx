"use client";

import { deleteSupplier } from "@/_actions/supplier";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

export function DeleteSupplierButton({
  id,
  children,
}: PropsWithChildren<{ id: number }>) {
  async function onDelete() {
    try {
      await deleteSupplier(id);
      toast.success("Supplier deleted successfully");
    } catch (error) {
      toast.error("Supplier deletetion failed");
    }
  }

  return (
    <button onClick={onDelete} className="w-full cursor-pointer">
      {children}
    </button>
  );
}
