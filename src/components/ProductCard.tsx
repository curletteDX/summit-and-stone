import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check, X } from "lucide-react";
import { UniformText } from "@uniformdev/canvas-react";
import { GetImageUrl } from "../lib/utils";

interface ProductCardComponent {
  parameters?: {
    image?: { value?: unknown };
    price?: { value?: number };
    category?: { value?: string[] };
    available?: { value?: boolean };
    link?: { value?: { path?: string; url?: string } };
  };
}

interface ProductCardProps {
  component: ProductCardComponent;
}

const categoryColors: Record<string, string> = {
  hiking: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  climbing: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  biking: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400",
};

export default function ProductCard({ component }: ProductCardProps) {
  const imageAssets = component.parameters?.image?.value ?? [];
  const imageUrl = GetImageUrl(imageAssets);
  const price = component.parameters?.price?.value;
  const categories = component.parameters?.category?.value ?? [];
  const availableValue = component.parameters?.available?.value;
  const available = availableValue === true || availableValue === "true";
  const link = component.parameters?.link?.value;
  const href = link?.path || link?.url || "#";

  const CardWrapper = href !== "#" ? Link : "div";
  const wrapperProps = href !== "#" ? { href } : {};

  return (
    <CardWrapper
      {...(wrapperProps as any)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:ring-zinc-100"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-zinc-300 dark:text-zinc-600" />
          </div>
        )}

        {categories.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                  categoryColors[cat] || "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <div
          className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
            available
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
          }`}
        >
          {available ? (
            <>
              <Check className="h-3 w-3" />
              <span>In Stock</span>
            </>
          ) : (
            <>
              <X className="h-3 w-3" />
              <span>Out of Stock</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <UniformText
          placeholder="Product Title"
          parameterId="title"
          as="h3"
          className="text-lg font-bold text-zinc-900 dark:text-zinc-50 line-clamp-2"
        />
        <UniformText
          placeholder="Product description goes here"
          parameterId="description"
          as="p"
          className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 text-pretty"
        />

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
          {price !== undefined && price !== null ? (
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              ${price.toFixed(2)}
            </span>
          ) : (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Price on request
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-50">
            View Details
            <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </span>
        </div>
      </div>
    </CardWrapper>
  );
}
