import z from "zod";

export const contactUsSchema = z.object({
  name: z
    .string()
    .min(5, "Full name must be at least 5 characters.")
    .max(32, "Full name must be at most 32 characters."),
  companyName: z
    .string()
    .min(3, "Last name must be at least 3 characters.")
    .max(32, "Last name must be at most 32 characters."),
  email: z
    .email("Email is invalid.")
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters."),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters.")
    .max(15, "Phone number must be at most 15 characters."),
  subject: z.string().max(32, "Subject must be at most 32 characters."),
  message: z.string().max(1000, "Message must be at most 1000 characters."),
});
