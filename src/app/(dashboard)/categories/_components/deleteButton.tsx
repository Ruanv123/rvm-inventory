"use client";

import { deleteCategories } from "@/_actions/category";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

export function DeleteCategoryButton({
  id,
  children,
}: PropsWithChildren<{ id: number }>) {
  async function onDelete() {
    try {
      await deleteCategories(id);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Category deletion failed");
    }
  }

  return (
    <button onClick={onDelete} className="w-full cursor-pointer">
      {children}
    </button>
  );
}
