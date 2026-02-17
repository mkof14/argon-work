import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AGRON Work",
    short_name: "AGRON Work",
    description: "Direct hiring platform for autonomous-era professionals.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7fb",
    theme_color: "#0073ea",
    icons: [
      {
        src: "/brand/agron_blue.webp",
        sizes: "512x512",
        type: "image/webp"
      }
    ]
  };
}
