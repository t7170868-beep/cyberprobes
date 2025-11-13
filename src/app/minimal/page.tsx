import { Metadata } from 'next';
import { getBaseURLObject } from '@/lib/getBaseURL';

export const metadata: Metadata = {
  title: "Minimal Test - CyberProbes",
  description: "Minimal test page",
  metadataBase: getBaseURLObject(),
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
