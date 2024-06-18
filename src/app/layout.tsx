import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { UserProvider } from "@/context/AdminContext";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northeast Voyage",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
        // className={cn({
        //   "debug-screens": process.env.NODE_ENV === "development",
        // })}
        >
          <main className="font-primary">
            <Suspense fallback={<>Loading...</>}>{children}</Suspense>
            <Toaster />
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
