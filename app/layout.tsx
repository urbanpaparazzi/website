import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const siteName = "Urban Paparazzi Nigeria";
const siteDescription =
  "Urban Paparazzi is a Nigerian digital magazine covering breaking news, entertainment, celebrity culture, lifestyle, interviews and original video stories.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Urban Paparazzi Nigeria",
    "Nigeria news",
    "Nigerian entertainment news",
    "celebrity news Nigeria",
    "African pop culture",
    "lifestyle stories Nigeria",
    "Nigerian interviews",
    "Nigeria entertainment videos",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: { canonical: baseUrl },
  openGraph: {
    type: "website",
    url: baseUrl,
    title: siteName,
    description: siteDescription,
    siteName,
    locale: "en_NG",
    images: [
      {
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [`${baseUrl}/logo.png`],
  },
  icons: {
    icon: "/logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: siteDescription,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <SanityLive />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
