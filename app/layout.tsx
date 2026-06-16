import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  title: "住宿券優惠 | 最低5折入住精選民宿",
  description: "精選台灣各地優質民宿住宿券，最低5折起，立即購買享受頂級住宿體驗。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
