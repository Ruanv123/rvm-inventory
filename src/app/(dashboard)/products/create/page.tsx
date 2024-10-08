"use client";

import { createProduct } from "@/_actions/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SelectCategory } from "../_components/select-category";
import { SelectSuppliers } from "../_components/select-suppliers";
import { useEffect, useTransition } from "react";
import { Loader } from "@/components/shared/loader";
import { FormRequired } from "@/components/shared/form-required";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  imageUrl: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number(),
  stockQuantity: z
    .number()
    .max(32, "Stock quantity must be less than 32 characters"),
  barCode: z.string().min(1, "Bar Code is required"),
  categoryId: z.string(),
  supplierId: z.string(),
});

export default function CreateProductPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stockQuantity: 0.0,
      barCode: "",
      categoryId: "",
      supplierId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      startTransition(() => {
        createProduct(data).then((res) => {
          if (res?.status !== 201) {
            toast.error(res?.message);
            form.reset({});
          }

          form.reset({
            barCode: "",
            categoryId: "",
            description: "",
            imageUrl: "",
            name: "",
            price: 0,
            stockQuantity: 0.0,
            supplierId: "",
          });
          router.refresh();
          toast.success(res?.message);
        });
      });
    } catch (error) {
      toast.error("Product creation failed");
    }
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Create Product</h1>
      </div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <FormRequired />
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <FormRequired />
                    </FormLabel>
                    <FormControl>
                      <Textarea cols={10} rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category <FormRequired />
                      </FormLabel>
                      <SelectCategory
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Supplier <FormRequired />
                      </FormLabel>
                      <SelectSuppliers
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Price <FormRequired />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(value) =>
                            field.onChange(+value.target.valueAsNumber)
                          }
                          step="0.01"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Stock Quantity <FormRequired />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(value) =>
                            field.onChange(+value.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="barCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      BarCode <FormRequired />
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} maxLength={13} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => form.reset({})}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Loader /> : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
