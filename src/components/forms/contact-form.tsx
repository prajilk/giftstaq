"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useState } from "react";
import { contactUsSchema } from "@/lib/zod";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: contactUsSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        toast.success("Message sent successfully!");
        form.reset();
        // const response = await submitContactUsForm(value);
        // if (response.data) {
        // 	toast.success("Message sent successfully!");
        // 	form.reset();
        // } else {
        // 	toast.error("Something went wrong!");
        // }
      } catch {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="space-y-3 mt-5 md:mt-0">
      <div>
        <div>
          <form
            id="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="grid lg:grid-cols-2 gap-3">
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-xs font-medium uppercase"
                        >
                          Full Name*
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Enter your full name"
                          autoComplete="off"
                          className="border-none px-2.5 py-5 bg-[#F5F5F5] rounded-full placeholder:text-sm"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="companyName"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-xs font-medium uppercase"
                        >
                          Company Name*
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Enter company name"
                          autoComplete="off"
                          className="border-none px-2.5 py-5 bg-[#F5F5F5] rounded-full placeholder:text-sm"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-3">
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-xs font-medium uppercase"
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
                          placeholder="Enter your Email ID"
                          autoComplete="off"
                          className="border-none px-2.5 py-5 bg-[#F5F5F5] rounded-full placeholder:text-sm"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="phone"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-xs font-medium uppercase"
                        >
                          Phone Number*
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Enter phone number"
                          autoComplete="off"
                          className="border-none px-2.5 py-5 bg-[#F5F5F5] rounded-full placeholder:text-sm"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <form.Field
                name="subject"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium uppercase"
                      >
                        Subject
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Project Type"
                        autoComplete="off"
                        className="border-none px-2.5 py-5 bg-[#F5F5F5] rounded-full placeholder:text-sm"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="message"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium uppercase"
                      >
                        Message
                      </FieldLabel>
                      <InputGroup className="border-none rounded-2xl">
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Tell us about your project or ask a question"
                          rows={6}
                          className="min-h-32 resize-none rounded-2xl bg-[#F5F5F5] placeholder:text-sm"
                          aria-invalid={isInvalid}
                        />
                      </InputGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </div>
        <div className="mt-5 flex flex-col-reverse lg:flex-row items-center justify-between gap-5 lg:gap-0">
          <Field orientation="horizontal">
            <Button type="submit" form="contact-form" disabled={loading}>
              Submit
            </Button>
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
