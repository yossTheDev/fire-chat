import { fontSans } from "@/lib/fonts";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./context/authProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "FireChat",
  description: "An example app using Next.js and Firebase",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${fontSans.variable} ${fontSans.className} antialiased max-h-screen h-screen`}
      >
        <ThemeProvider attribute="data-mode">
          <AuthProvider>
            <main className="flex flex-col w-full h-full">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
