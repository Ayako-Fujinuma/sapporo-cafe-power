"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_LABEL,
  POWER_LEVEL_LABEL,
  type Category,
  type Cafe,
  type PowerLevel,
} from "@/lib/cafes";

const POWER_BADGE_STYLE: Record<Cafe["powerLevel"], string> = {
  full: "bg-emerald-100 text-emerald-800",
  partial: "bg-amber-100 text-amber-800",
  counter: "bg-sky-100 text-sky-800",
};

const CATEGORY_BADGE_STYLE: Record<Category, string> = {
  cafe: "bg-orange-100 text-orange-800",
  coworking: "bg-indigo-100 text-indigo-800",
};

const POWER_LEVELS: PowerLevel[] = ["full", "partial", "counter"];
const CATEGORIES: Category[] = ["cafe", "coworking"];

function getGoogleMapsUrl(cafe: Cafe): string {
  const query = [cafe.name, cafe.address || cafe.nearestStation, "札幌"]
    .filter(Boolean)
    .join(" ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function CafeDirectory({ cafes }: { cafes: Cafe[] }) {
  const [area, setArea] = useState<string | null>(null);
  const [powerLevels, setPowerLevels] = useState<PowerLevel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const areas = useMemo(
    () => Array.from(new Set(cafes.map((cafe) => cafe.area))),
    [cafes],
  );

  function togglePowerLevel(level: PowerLevel) {
    setPowerLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
  }

  function toggleCategory(category: Category) {
    setCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  }

  const filtered = useMemo(() => {
    return cafes.filter((cafe) => {
      if (area && cafe.area !== area) return false;
      if (powerLevels.length > 0 && !powerLevels.includes(cafe.powerLevel)) return false;
      if (categories.length > 0 && !categories.includes(cafe.category)) return false;
      return true;
    });
  }, [area, powerLevels, categories, cafes]);

  return (
    <div>
      <div className="mb-6 space-y-3 rounded-xl border border-neutral-200 bg-white/70 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="w-16 shrink-0 text-xs text-neutral-400">エリア</p>
          <button
            type="button"
            onClick={() => setArea(null)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              area === null
                ? "border-neutral-800 bg-neutral-800 text-white"
                : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400"
            }`}
          >
            すべて
          </button>
          {areas.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setArea(a)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                area === a
                  ? "border-neutral-800 bg-neutral-800 text-white"
                  : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <p className="w-16 shrink-0 text-xs text-neutral-400">種別</p>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                categories.includes(category)
                  ? "border-neutral-800 bg-neutral-800 text-white"
                  : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {CATEGORY_LABEL[category]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <p className="w-16 shrink-0 text-xs text-neutral-400">電源</p>
          {POWER_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => togglePowerLevel(level)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                powerLevels.includes(level)
                  ? "border-neutral-800 bg-neutral-800 text-white"
                  : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {POWER_LEVEL_LABEL[level]}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-neutral-500">{filtered.length}件のスポットを表示中</p>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-500">
          条件に一致するスポットが見つかりませんでした。検索条件を変えてお試しください。
        </p>
      ) : (
        <div className="space-y-6">
          {filtered.map((cafe) => (
            <a
              key={cafe.id}
              href={getGoogleMapsUrl(cafe)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-neutral-400 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-800">
                    {cafe.name}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    {cafe.area} ・ {cafe.nearestStation}
                    {cafe.address ? ` ・ ${cafe.address}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_BADGE_STYLE[cafe.category]}`}
                  >
                    {CATEGORY_LABEL[cafe.category]}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${POWER_BADGE_STYLE[cafe.powerLevel]}`}
                  >
                    {POWER_LEVEL_LABEL[cafe.powerLevel]}
                  </span>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-neutral-400">電源</dt>
                  <dd className="text-sm font-medium text-neutral-800">{cafe.power}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-400">Wi-Fi</dt>
                  <dd className="text-sm font-medium text-neutral-800">{cafe.wifi}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-400">営業時間</dt>
                  <dd className="text-sm font-medium text-neutral-800">{cafe.hours}</dd>
                </div>
              </dl>

              {cafe.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {cafe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-4 text-sm text-neutral-600">{cafe.note}</p>

              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                  Googleマップで見る
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
