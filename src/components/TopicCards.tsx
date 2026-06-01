import React from "react";
import { UniformText, UniformSlot } from "@uniformdev/canvas-react";

export default function TopicCards() {
  return (
    <section className="font-sans px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <UniformText
          placeholder="Section Heading"
          parameterId="heading"
          as="h2"
          className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UniformSlot name="cards" />
        </div>
      </div>
    </section>
  );
}
