// Import polyfills first to prevent localStorage SSR issues
import "../lib/polyfills";

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import Navbar from '@/components/Navbar';
import EmergencyWidget from '@/components/EmergencyWidget';
import SmoothScroll from '@/components/SmoothScroll';
import GlobalErrorHandler from '@/components/GlobalErrorHandler';

export const metadata: Metadata = {
  title: "CyberProbes - Digital Forensics & Cybersecurity",
  description: "Professional cybersecurity services including penetration testing, incident response, digital forensics, and security consulting.",
  keywords: "cybersecurity, digital forensics, penetration testing, incident response, security consulting, cyber probes",
  authors: [{ name: "CyberProbes Team" }],
  creator: "CyberProbes",
  publisher: "CyberProbes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: (() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://main.d1ce8jq8iz0ibb.amplifyapp.com';
    try {
      return new URL(baseUrl);
    } catch {
      // Fallback if URL is invalid
      return new URL('https://main.d1ce8jq8iz0ibb.amplifyapp.com');
    }
  })(),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CyberProbes - Digital Forensics & Cybersecurity",
    description: "Professional cybersecurity services including penetration testing, incident response, digital forensics, and security consulting.",
    url: '/',
    siteName: 'CyberProbes',
    images: [
      {
        url: '/images/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CyberProbes - Digital Forensics & Cybersecurity',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CyberProbes - Digital Forensics & Cybersecurity",
    description: "Professional cybersecurity services including penetration testing, incident response, digital forensics, and security consulting.",
    images: ['/images/hero-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://cdn.tailwindcss.com" rel="stylesheet" />
      </head>
      <body className="min-h-screen font-inter" suppressHydrationWarning>
        <GlobalErrorHandler />
        <AuthProvider>
          <SmoothScroll />
          <Navbar />
          <main>{children}</main>
          <EmergencyWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
