import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UniformText } from "@uniformdev/canvas-react";
import { GetImageUrl } from "../lib/utils";

export default function TopicCard({ component }: any) {
  const imageAssets = component.parameters?.image?.value ?? [];
  const imageUrl = GetImageUrl(imageAssets);
  const link = component.parameters?.link?.value;
  const href = link?.path || link?.url || "#";

  return (
    <Link
      href={href}
      aria-label={`Explore topic`}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:ring-zinc-100"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <div className="flex items-start justify-between gap-4 p-6">
        <div className="flex flex-col gap-2">
          <UniformText
            placeholder="Title"
            parameterId="title"
            as="h3"
            className="text-xl font-bold text-zinc-900 dark:text-zinc-50"
          />
          <UniformText
            placeholder="Description"
            parameterId="description"
            as="p"
            className="text-sm text-zinc-600 dark:text-zinc-400 text-pretty"
          />
        </div>
        <ArrowRight
          className="mt-1 h-5 w-5 shrink-0 text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-50"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
