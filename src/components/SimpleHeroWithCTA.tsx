import React from "react";
import Link from "next/link";
import { UniformText, UniformRichText } from "@uniformdev/canvas-react";

export default function SimpleHeroWithCTA({ component }: any) {
  const ctaLink = component?.parameters?.ctaButtonLink?.value;
  const ctaHref = ctaLink?.path || ctaLink?.url || "#";

  return (
    <section className="relative font-sans">
      <div className="relative w-full" style={{ aspectRatio: "2/1" }}>
        <div className="absolute inset-0" />
        <div className="absolute inset-0 flex flex-col justify-center px-12 z-10">
          <UniformText
            placeholder="title content goes here"
            parameterId="heading"
            as="h1"
            className="text-5xl md:text-6xl font-bold"
          />
          <UniformRichText
            placeholder="description"
            parameterId="description"
            as="div"
            className="text-xl text-zinc-600 mt-4"
          />
          <div className="mt-8">
            <Link
              href={ctaHref}
              className="inline-block bg-white text-black px-8 py-3 text-lg font-semibold rounded hover:bg-zinc-200 transition-colors"
            >
              <UniformText
                placeholder="Button text"
                parameterId="ctaButtonText"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
