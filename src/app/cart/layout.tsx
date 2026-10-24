import type { Metadata } from "next";

export const metadata: Metadata = { title: "Your bag" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
