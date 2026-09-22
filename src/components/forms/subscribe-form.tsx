"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "@tanstack/react-form";
import { emailSubscribeSchema } from "@/lib/zod";
import { emailSubscribeForm } from "@/actions/emailSubscribeForm";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

const SubscribeForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: emailSubscribeSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        const result = await emailSubscribeForm(value);

        if (!result.success) {
          toast.error("Something went wrong!");
          // console.error(result.error)
          return;
        }

        toast.success("Subscribed successfully!");
        form.reset();
      } catch {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <form
      id="subscribe-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex items-center gap-1"
    >
      <FieldGroup>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-medium uppercase sr-only"
                >
                  Email ID*
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                  className="border-none bg-[#1D1D1D] text-[#A4A7AE] max-w-60"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <Field orientation="horizontal">
        <Button type="submit" form="subscribe-form" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </Field>
    </form>
  );
};

export default SubscribeForm;
