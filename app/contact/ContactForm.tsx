"use client";

import { useState, type FormEvent } from "react";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      return;
    }

    // ネイティブイベントのcurrentTargetはawaitのあと(イベント処理が完了した後)には
    // nullになってしまうため、非同期処理の前にフォーム要素への参照を保持しておく。
    const form = e.currentTarget;

    setStatus("sending");
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        送信しました。お問い合わせありがとうございます。
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-700">
          お名前
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 focus:border-neutral-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-700">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 focus:border-neutral-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-neutral-700">
          お問い合わせ内容
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-800 focus:border-neutral-500 focus:outline-none"
        />
      </div>

      {/* スパム対策のハニーポット(人間には見えない、Botだけが埋めてしまう欄) */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

      {status === "error" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          送信に失敗しました。時間をおいて再度お試しください。
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-neutral-800 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
      >
        {status === "sending" ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
