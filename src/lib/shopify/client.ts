import "server-only"; // throws build error if ever imported into a client component
import { GraphQLClient } from "graphql-request";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2024-10";

export const shopifyClient = new GraphQLClient(
  `https://${domain}/api/${apiVersion}/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": token,
      "Content-Type": "application/json",
    },
  },
);
