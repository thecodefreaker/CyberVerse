
import {createClient} from "@sanity/client";

export const client = createClient({
  projectId: "grt0al70", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2021-06-07",
  useCdn: true,
});

