import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "./SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_NAME = "さっぽろ電源カフェナビ";
const SITE_TITLE = "さっぽろ電源カフェナビ｜札幌のカフェで使える電源・Wi-Fiスポット";
const SITE_DESCRIPTION =
  "札幌市内で電源が使えるカフェ・コワーキングスペースをまとめました。作業や勉強にぴったりなスポットをエリア別に検索できます。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: ["/top_image_pc.jpeg"],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/top_image_pc.jpeg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Next.jsのnext/scriptだとJS経由での挿入になり、AdSenseのサイト確認クローラーが
            生HTML上でタグを検出できないため、あえて素の<script>タグを直接置いている。 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3246099949879278"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <footer className="bg-amber-50 px-6 py-8 text-center text-xs text-neutral-400">
          <nav className="mb-2 flex justify-center gap-4">
            <Link href="/about" className="hover:text-neutral-600">
              運営者情報
            </Link>
            <Link href="/privacy" className="hover:text-neutral-600">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="hover:text-neutral-600">
              お問い合わせ
            </Link>
          </nav>
          <p>© {new Date().getFullYear()} さっぽろ電源カフェナビ</p>
        </footer>
      </body>
    </html>
  );
}
