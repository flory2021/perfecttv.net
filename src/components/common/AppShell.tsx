"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/common/NavBar";
import FooterSection from "@/components/sections/FooterSection";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <main className="min-h-screen bg-white">
      {!isAdmin && <NavBar />}
      {children}
      {!isAdmin && (
        <div className="mt-[56px]">
          <FooterSection />
        </div>
      )}
    </main>
  );
}
