import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PawsomeAdviceApp",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className="min-h-screen flex flex-col">
        <Header lang={lang} />
        <main className="flex-1 bg-[#F5F5F0] pb-24">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
