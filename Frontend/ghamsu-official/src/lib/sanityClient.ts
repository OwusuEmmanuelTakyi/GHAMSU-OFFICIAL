import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// 🔹 Create the client to connect to your Sanity project
export const client = createClient({
  projectId: "8woja5wh", // your actual Sanity project ID
  dataset: "production", // usually 'production'
  apiVersion: "2025-10-27", // use a recent date
  useCdn: true, // enables caching for faster reads
});

// 🔹 Build URLs for images stored in Sanity
const builder = imageUrlBuilder(client);

// A helper function to easily use in React components
export const urlFor = (source: any) =>
  builder.image(source).auto("format").fit("max");
