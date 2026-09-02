"use client";

import { useMemo, useState } from "react";
import { POWER_LEVEL_LABEL, type Cafe, type PowerLevel } from "@/lib/cafes";

const POWER_BADGE_STYLE: Record<Cafe["powerLevel"], string> = {
  full: "bg-emerald-100 text-emerald-800",
  partial: "bg-amber-100 text-amber-800",
  counter: "bg-sky-100 text-sky-800",
};

const POWER_LEVELS: PowerLevel[] = ["full", "partial", "counter"];

function getGoogleMapsUrl(cafe: Cafe): string {
  const query = [cafe.name, cafe.address || cafe.nearestStation, "札幌"]
    .filter(Boolean)
    .join(" ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function CafeDirectory({ cafes }: { cafes: Cafe[] }) {
  const [area, setArea] = useState<string | null>(null);
  const [powerLevels, setPowerLevels] = useState<PowerLevel[]>([]);

  const areas = useMemo(
    () => Array.from(new Set(cafes.map((cafe) => cafe.area))),
    [cafes],
  );

  function togglePowerLevel(level: PowerLevel) {
    setPowerLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
  }

  const filtered = useMemo(() => {
    return cafes.filter((cafe) => {
      if (area && cafe.area !== area) return false;
      if (powerLevels.length > 0 && !powerLevels.includes(cafe.powerLevel)) return false;
      return true;
    });
  }, [area, powerLevels, cafes]);

  return (
    <div>
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium text-neutral-500">エリア</p>
        <div className="flex flex-wrap gap-2">
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
      </div>

      <div className="mb-8">
        <p className="mb-2 text-xs font-medium text-neutral-500">電源(複数選択可)</p>
        <div className="flex flex-wrap gap-2">
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
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${POWER_BADGE_STYLE[cafe.powerLevel]}`}
                >
                  {POWER_LEVEL_LABEL[cafe.powerLevel]}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-2 text-sm text-neutral-600 sm:grid-cols-3">
                <div>
                  <dt className="font-medium text-neutral-700">電源</dt>
                  <dd>{cafe.power}</dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-700">Wi-Fi</dt>
                  <dd>{cafe.wifi}</dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-700">営業時間</dt>
                  <dd>{cafe.hours}</dd>
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

              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                Googleマップで見る
                <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
