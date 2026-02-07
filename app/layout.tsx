import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { inconsolata, rubik } from "@/lib/fonts";
import { frFR } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "Slash - Scroller pour des produits",
  description: "Enregisterer et partager des produits que vous aimez",
};

const localization = frFR;

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
        <ClerkProvider localization={localization}>{children}</ClerkProvider>
      </body>
    </html>
  );
}
