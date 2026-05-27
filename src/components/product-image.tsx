import Image from "next/image";
import { cn } from "@/lib/utils";

// Shows the product's Cloudinary image, or a styled placeholder when none is set.
export function ProductImage({
  src,
  alt,
  sizes,
  className,
  priority,
}: {
  src?: string | null;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-purple-light", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-muted/50">
          <span className="text-[32px]">✦</span>
          <span className="text-[10px] uppercase tracking-[0.2em]">
            Image coming soon
          </span>
        </div>
      )}
    </div>
  );
}
