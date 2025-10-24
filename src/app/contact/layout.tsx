import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact CyberProbes - Get Expert Cybersecurity Consultation",
  description: "Contact CyberProbes for professional cybersecurity services, digital forensics, and incident response. Get a free consultation from our security experts.",
  keywords: "contact cyberprobes, cybersecurity consultation, digital forensics contact, security experts, incident response contact",
  openGraph: {
    title: "Contact CyberProbes - Get Expert Cybersecurity Consultation",
    description: "Contact CyberProbes for professional cybersecurity services, digital forensics, and incident response. Get a free consultation from our security experts.",
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact CyberProbes - Get Expert Cybersecurity Consultation",
    description: "Contact CyberProbes for professional cybersecurity services, digital forensics, and incident response. Get a free consultation from our security experts.",
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
