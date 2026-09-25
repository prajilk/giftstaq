"use client";

import { ReactElement, type ReactNode, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactUsSchema } from "@/lib/zod";
import { submitContactForm } from "@/actions/submitContactForm";
import { toast } from "sonner";

type ContactFormValues = z.infer<typeof contactUsSchema>;

export function ContactFormModal({ children }: { children: ReactElement }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    } satisfies ContactFormValues,

    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        const result = await submitContactForm(value);

        if (!result.success) {
          toast.error("Something went wrong!");
          // console.error(result.error)
          return;
        }

        toast.success("Message sent successfully!");
        form.reset();
      } catch {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          form.reset();
        }
      }}
    >
      <DialogTrigger render={children} />

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you soon.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const result = contactUsSchema.shape.name.safeParse(value);
                    return result.success
                      ? undefined
                      : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  >
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Name"
                      autoComplete="name"
                      aria-invalid={
                        field.state.meta.isTouched && !field.state.meta.isValid
                      }
                    />

                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError
                          errors={field.state.meta.errors.map(
                            (message) => new Error(message),
                          )}
                        />
                      )}
                  </Field>
                )}
              </form.Field>

              <form.Field name="companyName">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Company Name</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                  </Field>
                )}
              </form.Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const result = contactUsSchema.shape.email.safeParse(value);
                    return result.success
                      ? undefined
                      : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  >
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="mail@example.com"
                      autoComplete="email"
                      aria-invalid={
                        field.state.meta.isTouched && !field.state.meta.isValid
                      }
                    />

                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError
                          errors={field.state.meta.errors.map(
                            (message) => new Error(message),
                          )}
                        />
                      )}
                  </Field>
                )}
              </form.Field>

              <form.Field name="phone">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="+1 234 567 890"
                      autoComplete="tel"
                    />
                  </Field>
                )}
              </form.Field>
            </div>

            <form.Field
              name="subject"
              validators={{
                onChange: ({ value }) => {
                  const result = contactUsSchema.shape.subject.safeParse(value);

                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Subject</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="How can we help?"
                    aria-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  />

                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError
                      errors={field.state.meta.errors.map(
                        (message) => new Error(message),
                      )}
                    />
                  )}
                </Field>
              )}
            </form.Field>

            <form.Field
              name="message"
              validators={{
                onChange: ({ value }) => {
                  const result = contactUsSchema.shape.message.safeParse(value);

                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel htmlFor={field.name}>Message</FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Tell us more about your requirements..."
                    rows={5}
                    aria-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  />

                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError
                      errors={field.state.meta.errors.map(
                        (message) => new Error(message),
                      )}
                    />
                  )}
                </Field>
              )}
            </form.Field>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button disabled={loading} type="submit">
                Send Message
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
