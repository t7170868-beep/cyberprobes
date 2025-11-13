import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Authentication Error | CyberProbes",
  description: "An authentication error occurred. Please try again.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "https://main.d1ce8jq8iz0ibb.amplifyapp.com"
  ),
}

export default function AuthErrorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

