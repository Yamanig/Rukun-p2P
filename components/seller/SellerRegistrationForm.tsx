"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  availableAmount: z.string().min(1, "Available amount is required"),
  pricePerUnit: z.string().min(1, "Price per unit is required"),
  deliveryTime: z.string().min(1, "Delivery time is required"),
  paymentMethods: z.array(z.string()).min(1, "Select at least one payment method"),
  usdtAddress: z
    .string()
    .regex(
      /^(T[A-Za-z0-9]{33}|0x[a-fA-F0-9]{40})$/,
      "Invalid USDT address (TRC20 or ERC20)"
    ),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  availableAmount: "",
  pricePerUnit: "",
  deliveryTime: "",
  paymentMethods: [],
  usdtAddress: "",
  termsAccepted: false,
};

const paymentMethodOptions = ["EVC", "E-DAHAB", "ZAAD"] as const;
const deliveryTimeOptions = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "1 hour" },
] as const;

interface SellerRegistrationFormProps {
  createSeller: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export function SellerRegistrationForm({ createSeller }: SellerRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("availableAmount", values.availableAmount);
      formData.append("pricePerUnit", values.pricePerUnit);
      formData.append("deliveryTime", values.deliveryTime);
      values.paymentMethods.forEach(method => {
        formData.append("paymentMethods", method);
      });
      formData.append("usdtAddress", values.usdtAddress);

      const result = await createSeller(formData);

      if (result.success) {
        toast.success("Successfully registered as a seller!");
        router.push("/exchange");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to register as a seller");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Seller registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="availableAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Amount (USDT)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter available amount"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricePerUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per USDT ($)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter price per unit"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select delivery time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deliveryTimeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="usdtAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>USDT Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your USDT address (TRC20 or ERC20)"
                      />
                    </FormControl>
                    <FormDescription>
                      TRC20 or ERC20 address for receiving USDT
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="paymentMethods"
              render={() => (
                <FormItem>
                  <FormLabel>Payment Methods</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentMethodOptions.map((method) => (
                      <FormField
                        key={method}
                        control={form.control}
                        name="paymentMethods"
                        render={({ field }) => (
                          <FormItem
                            key={method}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(method)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), method]
                                    : field.value?.filter((val) => val !== method) || [];
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {method}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Make sure to verify your USDT address. This will be used for all
                your transactions.
              </AlertDescription>
            </Alert>

            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      I agree to the terms of service and privacy policy
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="border-t pt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register as Seller
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}