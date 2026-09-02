/**
 * さっぽろ電源カフェナビ - データ鮮度チェック
 *
 * 使い方:
 * 1. このスプレッドシートを開き、「拡張機能」→「Apps Script」
 * 2. デフォルトのコードを消して、このファイルの中身を全部貼り付けて保存
 * 3. 上部の関数選択で "setup" を選んで実行(初回のみ)
 *    → Googleアカウントの権限確認が出るので許可する
 * 4. これで、行を編集すると「最終更新日」列が自動更新され、
 *    毎月1日に半年以上更新のない店舗があればメールで知らせてくれる
 * 5. 関数選択で "backfillLastUpdated" を選んで実行(初回のみ)
 *    → 空欄の「最終更新日」に今日の日付を一括で入れる。これをやらないと
 *      次回のチェックで全店舗が「古い」扱いになってしまう。
 *
 * 手動でチェックしたい時は、スプレッドシートを開き直すと
 * 「電源カフェ管理」メニューが増えているので、そこから実行できる。
 */

const LAST_UPDATED_HEADER = "最終更新日";
const NAME_HEADER = "店名";
const STALE_MONTHS = 6; // これより古い行をレビュー対象にする
const NOTIFY_EMAIL = ""; // 空欄なら、スクリプトを実行したGoogleアカウント宛に送る

function getSheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function getHeader_(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

// 「最終更新日」列がなければ末尾に追加し、その列番号(1始まり)を返す
function ensureLastUpdatedColumn_() {
  const sheet = getSheet_();
  const header = getHeader_(sheet);
  let idx = header.indexOf(LAST_UPDATED_HEADER);
  if (idx === -1) {
    idx = header.length;
    sheet.getRange(1, idx + 1).setValue(LAST_UPDATED_HEADER);
  }
  return idx + 1;
}

// 行が編集されたら、その行の「最終更新日」を今日の日付にする(簡易トリガー)
function onEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getSheetId() !== getSheet_().getSheetId()) return;

  const row = e.range.getRow();
  if (row === 1) return; // 見出し行は対象外

  const col = ensureLastUpdatedColumn_();
  if (e.range.getColumn() === col) return; // 最終更新日列自体を編集した時は無視(無限ループ防止)

  sheet.getRange(row, col).setValue(new Date());
}

// メニューから手動実行できるように追加
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("電源カフェ管理")
    .addItem("今すぐ鮮度チェックを送る", "notifyStaleRows")
    .addToUi();
}

// 半年以上「最終更新日」が更新されていない店舗をメールで知らせる
function notifyStaleRows() {
  const sheet = getSheet_();
  const header = getHeader_(sheet);
  const nameCol = header.indexOf(NAME_HEADER) + 1;
  const updatedCol = ensureLastUpdatedColumn_();

  const lastRow = sheet.getLastRow();
  if (lastRow < 2 || nameCol === 0) return;

  const values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();

  const staleLimit = new Date();
  staleLimit.setMonth(staleLimit.getMonth() - STALE_MONTHS);

  const staleNames = [];
  values.forEach((row) => {
    const name = row[nameCol - 1];
    const lastUpdated = row[updatedCol - 1];
    if (!name) return;
    if (!lastUpdated || new Date(lastUpdated) < staleLimit) {
      staleNames.push(name);
    }
  });

  if (staleNames.length === 0) return;

  const to = NOTIFY_EMAIL || Session.getActiveUser().getEmail();
  const subject = `【さっぽろ電源カフェナビ】情報確認のお願い(${staleNames.length}件)`;
  const body =
    `以下の${staleNames.length}件は、${STALE_MONTHS}ヶ月以上「最終更新日」が更新されていません。\n` +
    `営業時間・電源の有無・住所などに変更がないか、確認・更新をお願いします。\n\n` +
    staleNames.map((n) => `・${n}`).join("\n") +
    `\n\nスプレッドシート: ${sheet.getParent().getUrl()}`;

  MailApp.sendEmail(to, subject, body);
}

// 空欄の「最終更新日」に今日の日付を一括で入れる(既存データを初期化する用、1回だけ実行すればOK)
function backfillLastUpdated() {
  const sheet = getSheet_();
  const col = ensureLastUpdatedColumn_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const range = sheet.getRange(2, col, lastRow - 1, 1);
  const values = range.getValues();
  const today = new Date();

  let filled = 0;
  const updated = values.map((row) => {
    if (row[0]) return row; // すでに日付が入っている行はそのまま
    filled++;
    return [today];
  });

  range.setValues(updated);
  Logger.log(`${filled}件に今日の日付を入れました。`);
}

function deleteExistingTriggers_() {
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === "notifyStaleRows") {
      ScriptApp.deleteTrigger(t);
    }
  });
}

// 初回セットアップ: 「最終更新日」列を用意し、毎月1日9時の自動チェックを登録する
function setup() {
  ensureLastUpdatedColumn_();
  deleteExistingTriggers_();
  ScriptApp.newTrigger("notifyStaleRows").timeBased().onMonthDay(1).atHour(9).create();
  Logger.log("セットアップ完了: 毎月1日9時に鮮度チェックメールが送られます。");
}
