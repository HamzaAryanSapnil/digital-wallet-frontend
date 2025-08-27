/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import type { AxiosError } from "axios";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router";

const schema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters")
    .refine((s) => s !== "", "New password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function ChangePassword() {
  const navigate = useNavigate();
  const [changePass] = useChangePasswordMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await changePass(values).unwrap();

      if (res?.success) {
        toast.success(res?.message ?? "Password changed successfully");
        navigate("/");
      }
      form.reset();
    } catch (err) {
      console.error(err);
      const error = err as FetchBaseQueryError | AxiosError<any>;
      if ((error as AxiosError).isAxiosError) {
        const axiosErr = error as AxiosError<any>;
        toast.error(axiosErr.response?.data?.message ?? "Axios error occurred");
      } else if ("status" in (error as FetchBaseQueryError)) {
        const rtkErr = error as FetchBaseQueryError;
        toast.error(
          (rtkErr.data as any)?.message ??
            "Something went wrong during cash-in!"
        );
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md w-full flex flex-col gap-4 justify-center items-center min-h-screen p-4 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full "
          noValidate
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter current password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter new password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Change password</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
