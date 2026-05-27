"use client";

import { useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

// Uploads straight from the browser to Cloudinary, then stores the returned
// secure URL in a hidden input named "imageUrl" so the form action receives it.
export function ImageUpload({ defaultUrl }: { defaultUrl?: string | null }) {
  const [url, setUrl] = useState<string>(defaultUrl ?? "");

  return (
    <div>
      <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-gold">
        Product Image
      </label>

      <input type="hidden" name="imageUrl" value={url} />

      <div className="flex items-center gap-4">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-border-faint bg-purple-light">
          {url ? (
            <Image
              src={url}
              alt="Product preview"
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-text-muted/60">
              no image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{ folder: "moonspell/products", maxFiles: 1 }}
            onSuccess={(result) => {
              if (
                result?.info &&
                typeof result.info === "object" &&
                "secure_url" in result.info
              ) {
                setUrl(result.info.secure_url as string);
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="border border-gold px-5 py-2.5 font-display text-[11px] uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-deep"
              >
                {url ? "Change Image" : "Upload Image"}
              </button>
            )}
          </CldUploadWidget>

          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="text-left text-[11px] uppercase tracking-[0.15em] text-text-muted hover:text-red-400"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
