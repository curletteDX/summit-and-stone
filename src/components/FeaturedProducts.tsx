import React from "react";
import { UniformText, UniformSlot } from "@uniformdev/canvas-react";
import { Sparkles } from "lucide-react";

export default function FeaturedProducts() {
  return (
    <section className="font-sans px-6 py-16 md:py-24 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900/30 px-4 py-1.5 text-sm font-medium text-amber-800 dark:text-amber-400 mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Featured Collection</span>
          </div>

          <UniformText
            placeholder="Our Top Picks"
            parameterId="heading"
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 text-balance"
          />

          <UniformText
            placeholder="Explore our curated selection of premium outdoor gear"
            parameterId="subheading"
            as="p"
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl text-pretty"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <UniformSlot name="products" />
        </div>
      </div>
    </section>
  );
}
