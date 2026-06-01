import React from "react";
import Image from "next/image";
import { UniformText, UniformRichText } from "@uniformdev/canvas-react";
import { GetImageUrl } from "../lib/utils";

type ImagePosition = "left" | "right";

interface ImageWithTextComponent {
  parameters?: {
    image?: { value?: unknown };
    imagePosition?: { value?: ImagePosition };
  };
}

interface ImageWithTextProps {
  component: ImageWithTextComponent;
}

export default function ImageWithText({ component }: ImageWithTextProps) {
  const imageAssets = component.parameters?.image?.value ?? [];
  const imageUrl = GetImageUrl(imageAssets);
  const imagePosition: ImagePosition =
    component.parameters?.imagePosition?.value === "right" ? "right" : "left";

  const isImageRight = imagePosition === "right";

  return (
    <section className="font-sans px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div
            className={`flex flex-col ${
              isImageRight ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[420px]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800" />
              )}
            </div>

            <div className="flex w-full md:w-1/2 flex-col justify-center gap-4 p-8 md:p-12">
              <UniformText
                placeholder="Heading goes here"
                parameterId="heading"
                as="h2"
                className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 text-balance"
              />
              <UniformText
                placeholder="Subheading goes here"
                parameterId="subheading"
                as="p"
                className="text-lg text-zinc-600 dark:text-zinc-400 text-pretty"
              />
              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
                <UniformRichText
                  placeholder="Rich text content goes here"
                  parameterId="content"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
