import type { Metadata } from "next";
import "./globals.css";
import { getDictionary } from "./dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ lang: string, page: string }> }): Promise<Metadata> {
  const { lang, page } = await params;
  const dict = await getDictionary(lang as "es" | "en");

  if (page === "detail") {
    return {
      title: dict.metadataDetail.title,
      description: dict.metadataDetail.description,
    };
  }

  return {
    title: dict.metadataList.title,
    description: dict.metadataList.description,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body>
        <Header></Header>
        <main>
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
