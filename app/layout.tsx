import type { Metadata } from "next";
import "./globals.css";
import { inconsolata, rubik } from "@/lib/fonts";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Slash - Scroller pour des produits",
  description: "Enregisterer et partager des produits que vous aimez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${inconsolata.className} ${rubik.variable} antialiased`}
      >
        <AuthProvider>
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
