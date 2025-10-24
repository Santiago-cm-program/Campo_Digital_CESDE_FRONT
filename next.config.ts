import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.tierragro.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.falabella.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "confiabonos.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.eurochem-na.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.croper.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fertisa.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "stcroperproduction.blob.core.windows.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.elsemillero.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "http2.mlstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "frutosysemillas.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.macho.com.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "agroactivocol.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "paisagro.com.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.solla.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "agroecologysl.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "exitocol.vtexassets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rexcosur-solutions.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pf.honda.com.pe",
        pathname: "/**",
      },

    ],
  },
};

export default nextConfig;
