"use client";

import { logout } from "@/_actions/login";
import { updatePasswordLogged } from "@/_actions/user";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password too short")
      .max(32, "Password too long"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function PasswordForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      startTransition(async () => {
        await updatePasswordLogged(data.password);
        toast.success("Password updated successfully");
        form.reset();
        await logout();
      });
    } catch (error) {
      toast.error("Failed to update password");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Security</h1>
        <p className="text-muted-foreground">Update your password.</p>
      </div>
      <Card>
        <CardContent className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="ml-auto" disabled={isPending}>
                {isPending ? <Loader /> : "Update Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
