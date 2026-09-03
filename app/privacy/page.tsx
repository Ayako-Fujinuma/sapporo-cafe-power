import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜さっぽろ電源カフェナビ",
  description: "さっぽろ電源カフェナビのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-amber-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-2xl font-bold text-neutral-800">プライバシーポリシー</h1>

        <div className="space-y-8 text-sm leading-relaxed text-neutral-700">
          <p>
            「さっぽろ電源カフェナビ」(以下「当サイト」といいます)は、本ページにおいて、当サイトをご利用いただく際に取得する情報の取り扱いについて説明します。
          </p>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-800">
              広告の配信について
            </h2>
            <p>
              当サイトは、第三者配信の広告サービス「Google
              AdSense」を利用しています。Google
              AdSenseを含む第三者配信事業者は、Cookie(クッキー)を使用して、ユーザーが当サイトや他のサイトに過去にアクセスした際の情報に基づいて広告を配信することがあります。
            </p>
            <p className="mt-2">
              Cookieを無効にする方法や、Google
              AdSenseに関する詳細については、
              <a
                href="https://policies.google.com/technologies/ads?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                Google広告 – ポリシーと規約
              </a>
              をご確認ください。パーソナライズ広告を無効にしたい場合は、
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                広告設定
              </a>
              から変更できます。
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-800">
              アクセス解析ツールについて
            </h2>
            <p>
              当サイトでは、サービス向上のためGoogleアナリティクスなどのアクセス解析ツールを利用する場合があります。これらのツールはCookieを使用してデータを収集しますが、氏名・住所・メールアドレスなど個人を特定する情報は含まれません。この機能はCookieを無効にすることで収集を拒否できます。
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-800">
              お問い合わせフォームについて
            </h2>
            <p>
              当サイトの
              <Link href="/contact" className="text-blue-700 underline">
                お問い合わせフォーム
              </Link>
              では、返信のためにお名前・メールアドレスをご入力いただきます。取得した情報は、お問い合わせへの対応以外の目的では使用しません。
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-800">
              掲載情報の正確性について
            </h2>
            <p>
              当サイトに掲載しているカフェ・コワーキングスペースの営業時間、座席数、電源の有無などの情報は、可能な限り正確な情報を掲載するよう努めていますが、内容を保証するものではありません。ご利用の際は、必ず各店舗の公式情報をご確認ください。当サイトの情報を利用したことによって生じた損害について、当サイトは一切の責任を負いかねます。
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-800">著作権について</h2>
            <p>
              当サイトに掲載している文章・画像等の著作権は当サイトまたは正当な権利者に帰属します。無断での複製・転載はご遠慮ください。
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-800">
              プライバシーポリシーの変更について
            </h2>
            <p>
              当サイトは、必要に応じて本ポリシーの内容を予告なく変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-800">お問い合わせ</h2>
            <p>
              本ポリシーに関するお問い合わせは、
              <Link href="/contact" className="text-blue-700 underline">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
