import type { Metadata } from "next";
import { UserProvider } from "@/context/AdminContext";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import "./globals.css";
import { ChangePasswordProvider } from "@/context/ChangePasswordContext";

export const metadata: Metadata = {
  title: "Northeast Travel Guide | Explore the Marvels of the Northeast",
  description:
    "Discover the wonders of Northeast with our comprehensive travel packages @northeastvoyage! Plan your trip with off-beat locations and top destinations.",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        href: "/favicon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
      />
      <UserProvider>
        <ChangePasswordProvider>
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
        </ChangePasswordProvider>
      </UserProvider>
    </html>
  );
}
