/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ICashPayload } from "@/types";
import { IconMoneybag } from "@tabler/icons-react";
import { useAgentCashInMutation } from "@/redux/features/Agent/agent.api";
import { toast } from "sonner";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { AxiosError } from "axios";

export default function AgentCashIn() {
  const [cashIn] = useAgentCashInMutation();
  const form = useForm<ICashPayload>();
  const onSubmit: SubmitHandler<ICashPayload> = async (data) => {
    try {
      const res = await cashIn(data).unwrap();
      if (res?.success) {
        toast.success(res?.message ?? "User Cash-In Successfully");
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
      // toast.error(err?.data?.message ??  "Something went wrong during cash-out!");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Cash In</CardTitle>
            <CardDescription>
              To Cash In, Give user phone number and amount
            </CardDescription>
          </CardHeader>
          <CardContent className=" md:min-w-96 lg:min-w-2xl ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="userPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="013xxxxxxxx"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Amount"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant={"ghost"} type="submit" className="w-full ">
                  Cash In <IconMoneybag className="ml-2" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
