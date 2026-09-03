import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報｜さっぽろ電源カフェナビ",
  description: "さっぽろ電源カフェナビの運営者情報です。",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-amber-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-2xl font-bold text-neutral-800">運営者情報</h1>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-700">
          <div>
            <dt className="font-semibold text-neutral-800">サイト名</dt>
            <dd className="mt-1">さっぽろ電源カフェナビ</dd>
          </div>

          <div>
            <dt className="font-semibold text-neutral-800">運営者</dt>
            <dd className="mt-1">さっぽろ電源カフェナビ運営チーム</dd>
          </div>

          <div>
            <dt className="font-semibold text-neutral-800">サイトの目的</dt>
            <dd className="mt-1">
              札幌市内で電源が使えるカフェ・コワーキングスペースの情報をまとめ、リモートワークや勉強場所を探している方の役に立つことを目指しています。
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-neutral-800">情報の収集方法</dt>
            <dd className="mt-1">
              掲載している店舗情報は、公式サイトや各種情報サイトをもとに調査・作成しています。営業時間や設備は変更される場合があるため、ご来店前に必ず各店舗の公式情報をご確認ください。
            </dd>
          </div>

          <div>
            <dt className="font-semibold text-neutral-800">お問い合わせ</dt>
            <dd className="mt-1">
              掲載情報の誤り・削除依頼などは
              <Link href="/contact" className="text-blue-700 underline">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </dd>
          </div>
        </div>
      </div>
    </main>
  );
}
