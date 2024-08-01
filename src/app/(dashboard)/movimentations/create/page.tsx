"use client";

import { createMovimentation } from "@/_actions/movimentation";
import { Loader } from "@/components/shared/loader";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { MovementType } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SelectProducts } from "../_components/select-products";

const formSchema = z.object({
  quantity: z.string().transform((val) => parseFloat(val)),
  type: z.enum([MovementType.IN, MovementType.OUT]),
  reason: z.string().min(1, "Reason is required").optional(),
  productId: z.string().min(1, "Product is required"),
});

export default function CreateMovimentationPage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      startTransition(async () => {
        console.log(data);
        await createMovimentation(data);
        toast.success("Movimentation created successfully");
        form.reset({
          quantity: undefined,
          type: undefined,
          reason: undefined,
          productId: "none",
        });
      });
    } catch (error) {
      toast.error(`Failed to create Movimentation: ${error}`);
    }
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Movimentation Item
        </h1>
      </div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={MovementType.IN}>IN</SelectItem>
                        <SelectItem value={MovementType.OUT}>OUT</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>

                    <FormControl>
                      <Textarea cols={10} rows={5} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>

                    <FormControl>
                      <SelectProducts
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="ml-auto flex gap-2">
                <Button type="button" variant="secondary">
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
