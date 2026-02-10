import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getGlobal } from "@/lib/strapi";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  const seo = global?.defaultSeo;

  return {
    title: {
      default: seo?.metaTitle || "Tư Vấn Dịch Vụ Thẩm Mỹ Tại Số 10 Trần Điền – Hà Nội",
      template: "%s | Thẩm Mỹ 10 Trần Điền",
    },
    description: seo?.metaDescription || "Cơ sở tư vấn dịch vụ thẩm mỹ uy tín tại Số 10 Trần Điền, Hà Nội.",
    keywords: seo?.keywords,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: global?.siteName || "Thẩm Mỹ 10 Trần Điền",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await getGlobal();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: global?.siteName || "Tư Vấn Dịch Vụ Thẩm Mỹ Hà Nội",
    description: "Cơ sở tư vấn dịch vụ thẩm mỹ uy tín tại Số 10 Trần Điền, Hà Nội",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Số 10 Trần Điền",
      addressLocality: "Hoàng Mai",
      addressRegion: "Hà Nội",
      addressCountry: "VN",
    },
    telephone: global?.phone || "0901234567",
    email: global?.email,
    url: "https://tuvandichvuthammy.com",
    openingHours: ["Mo-Sa 08:00-18:00", "Su 08:00-12:00"],
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.98",
      longitude: "105.84",
    },
    image: "/logo.png",
  };

  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`}>
        <JsonLd data={localBusinessSchema} />
        <Header phone={global?.phone} />
        <main className="min-h-screen">{children}</main>
        <Footer address={global?.address} phone={global?.phone} email={global?.email} />
      </body>
    </html>
  );
}
