import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PRODUCT_ID,
  dataset: "share_me_app",
  apiVersion: "2021-11-16",
  useCdn: false,
  token: process.env.REACT_APP_SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
