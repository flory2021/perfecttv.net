import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/common/AppShell";
import { Toaster } from "@/components/ui/toaster";
import LoadingIndicator from "@/components/common/LoadingIndicator";

export const metadata: Metadata = {
  title: "Perfect TV",
  description: "Perfect TV - Le média du peuple",
};

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={poppin.className}>
        <LoadingIndicator />
        <AppShell>{children}</AppShell>
        <Toaster />
      </body>
    </html>
  );
}
