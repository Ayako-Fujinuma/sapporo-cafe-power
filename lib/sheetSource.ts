import { FALLBACK_CAFES, type Cafe, type PowerLevel } from "./cafes";

// Googleスプレッドシートの「ファイル > 共有 > 埋め込みリンクの取得」で発行される
// CSVエクスポートURL(/export?format=csv&gid=...)を設定する。
const SHEET_CSV_URL = process.env.SHEET_CSV_URL;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function normalizePowerLevel(raw: string): PowerLevel {
  if (raw.includes("全席")) return "full";
  if (raw.includes("カウンター")) return "counter";
  return "partial";
}

function slugify(name: string, index: number): string {
  const ascii = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return ascii ? `${ascii}-${index}` : `cafe-${index}`;
}

function rowsToCafes(rows: string[][]): Cafe[] {
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.trim());
  const colIndex = (name: string) => header.indexOf(name);

  return rows.slice(1).map((cells, index) => {
    const get = (name: string) => {
      const i = colIndex(name);
      return i === -1 ? "" : (cells[i] ?? "").trim();
    };

    const name = get("店名");
    const seatsRaw = get("座席数");
    const tagsRaw = get("タグ");

    return {
      id: slugify(name, index),
      name,
      area: get("エリア"),
      nearestStation: get("最寄り駅"),
      address: get("住所") || undefined,
      power: get("電源"),
      powerLevel: normalizePowerLevel(get("電源レベル")),
      wifi: get("Wi-Fi"),
      hours: get("営業時間"),
      seats: seatsRaw ? Number(seatsRaw) || undefined : undefined,
      tags: tagsRaw ? tagsRaw.split("/").map((t) => t.trim()).filter(Boolean) : [],
      note: get("備考"),
    };
  }).filter((cafe) => cafe.name !== "");
}

export async function fetchCafes(): Promise<{ cafes: Cafe[]; source: "sheet" | "fallback" }> {
  if (!SHEET_CSV_URL) {
    return { cafes: FALLBACK_CAFES, source: "fallback" };
  }

  try {
    // 署名付きリダイレクトURLを経由するため、Next.jsのData Cache(next.revalidate)を
    // 通すと空応答になることがある。cache: "no-store" で毎回素のfetchを行う。
    const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`sheet fetch failed: ${res.status}`);

    const text = await res.text();
    const cafes = rowsToCafes(parseCsv(text));
    if (cafes.length === 0) throw new Error("sheet returned no rows");

    return { cafes, source: "sheet" };
  } catch (err) {
    console.error("[sheetSource] falling back to static cafe list:", err);
    return { cafes: FALLBACK_CAFES, source: "fallback" };
  }
}
