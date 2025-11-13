import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Minimal Test - CyberProbes",
  description: "Minimal test page",
  metadataBase: new URL('https://main.d1ce8jq8iz0ibb.amplifyapp.com'),
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
