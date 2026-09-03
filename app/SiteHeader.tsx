"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="border-b border-amber-100 bg-amber-50 px-6 py-3">
      <Link
        href="/"
        className="text-sm font-semibold text-neutral-700 hover:text-neutral-900"
      >
        ← さっぽろ電源カフェナビ トップに戻る
      </Link>
    </div>
  );
}
