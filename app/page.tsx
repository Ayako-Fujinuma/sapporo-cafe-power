import CafeDirectory from "./CafeDirectory";
import { fetchCafes } from "@/lib/sheetSource";

export default async function Home() {
  const { cafes } = await fetchCafes();

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <header className="relative mb-10 overflow-hidden rounded-2xl bg-[url('/top_image_sp.jpeg')] bg-cover bg-center text-center text-white shadow-sm md:bg-[url('/top_image_pc.jpeg')]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
          <div className="relative px-6 py-20 sm:py-24">
            <h1 className="text-3xl font-bold sm:text-4xl">
              さっぽろ電源カフェナビ
            </h1>
            <p className="mt-3 text-neutral-100">
              作業・勉強にぴったりな、電源が使える札幌市内のカフェ・コワーキングスペースを紹介します
            </p>
          </div>
        </header>

        <p className="mb-8 rounded-lg bg-neutral-100 px-4 py-2 text-xs text-neutral-500">
          営業時間・座席数・電源の有無は変更される場合があります。訪問前に各店舗の公式情報でご確認ください。
        </p>

        <CafeDirectory cafes={cafes} />
      </div>
    </main>
  );
}
