import { Metadata } from 'next';

// Disable prerendering to prevent build-time URL errors
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Minimal Test - CyberProbes",
  description: "Minimal test page",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "https://main.d1ce8jq8iz0ibb.amplifyapp.com"
  ),
  alternates: {
    canonical: '/minimal',
  },
  openGraph: {
    title: "Minimal Test - CyberProbes",
    description: "Minimal test page",
    url: '/minimal',
    type: 'website',
  },
};

export default function MinimalPage() {
  return <h1>Minimal Test</h1>;
}
