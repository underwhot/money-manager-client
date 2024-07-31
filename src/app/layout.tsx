import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "@/store/StoreProvider";
import CheckAuthProvider from "./check-auth-provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Maney Manager",
  description: "Manage your money with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${roboto.className} flex min-h-screen flex-col`}>
        <StoreProvider>
          <CheckAuthProvider>
            <Header />
            <main className="container flex flex-1 flex-col py-4">
              {children}
            </main>
            <Footer />
            <Toaster />
          </CheckAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
