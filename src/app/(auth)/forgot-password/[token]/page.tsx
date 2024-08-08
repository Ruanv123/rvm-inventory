"use client";

import { ResetPasswordToken } from "@/_actions/reset-password";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordTokenPage({
  params,
}: {
  params: { token: string };
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { token } = params;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      startTransition(() => {
        ResetPasswordToken(token, values.password).then((res) => {
          if (res?.status !== 200) {
            toast.error(res?.message);
          }

          form.reset({ confirmPassword: "", password: "" });
          toast.success(res?.message);
          router.push("/signin");
        });
      });
    } catch (error) {
      toast.error("Failed to reset password");
    }
  }

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center w-[450px]">
        <h1 className="text-2xl font-bold">Set new password</h1>
        <p className="text-center mt-2 text-muted-foreground text-md">
          Your new password must be different from previously used passwords.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-3 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters
                  </FormDescription>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2">
              {isPending ? <Loader /> : "Reset Password"}
            </Button>
          </form>
        </Form>
        <Link
          href="/signin"
          className="mt-5 text-muted-foreground text-sm flex gap-2 items-center"
        >
          <ArrowLeft size={14} /> Back to login
        </Link>
      </div>
    </main>
  );
}
