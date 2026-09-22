import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Homepage } from "./globals/HomePage";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";
import { ContactPage } from "./globals/ContactPage";
import { ProductListingPage } from "./globals/ProductListingPage";
import { ProductPage } from "./globals/ProductPage";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { EmailSubscribeSubmissions } from "./collections/EmailSubscribeSubmissions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ContactSubmissions, EmailSubscribeSubmissions],
  globals: [
    Homepage,
    Header,
    Footer,
    ContactPage,
    ProductListingPage,
    ProductPage,
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [],
});
