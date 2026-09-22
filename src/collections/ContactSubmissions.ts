import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  access: {
    read: ({ req: { user } }) => Boolean(user), // only logged-in admins can read
    create: () => true, // anyone can submit
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "companyName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    { name: "subject", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
  ],
};
