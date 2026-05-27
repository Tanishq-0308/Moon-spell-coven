"use client";

import { useTransition } from "react";
import { deleteProduct } from "./actions";

export function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${name}"? This cannot be undone.`)) {
          startTransition(() => deleteProduct(id));
        }
      }}
      className="border border-red-500/40 px-4 py-2 font-display text-[11px] uppercase tracking-[0.15em] text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
    >
      {pending ? "…" : "Delete"}
    </button>
  );
}
