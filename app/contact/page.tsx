import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ｜さっぽろ電源カフェナビ",
  description: "さっぽろ電源カフェナビへのお問い合わせフォームです。",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-amber-50 px-6 py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-2 text-2xl font-bold text-neutral-800">お問い合わせ</h1>
        <p className="mb-8 text-sm text-neutral-500">
          掲載情報の誤り・削除依頼・その他ご意見などは、以下のフォームからご連絡ください。
        </p>
        <ContactForm />
      </div>
    </main>
  );
}
