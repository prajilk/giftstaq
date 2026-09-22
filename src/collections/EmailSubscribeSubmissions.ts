import type { CollectionConfig } from "payload";

export const EmailSubscribeSubmissions: CollectionConfig = {
  slug: "email-subscribe-submissions",
  access: {
    read: ({ req: { user } }) => Boolean(user), // only logged-in admins can read
    create: () => true, // anyone can submit
  },
  fields: [{ name: "email", type: "email", required: true }],
};
