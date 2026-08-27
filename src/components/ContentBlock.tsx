import React from "react";
import Link from "next/link";
import { UniformText, UniformRichText } from "@uniformdev/canvas-react";

export default function ContentBlock({ component }: any) {
  const linkParam = component?.parameters?.link?.value;
  const linkHref = linkParam?.path || linkParam?.url || "";
  const linkText = linkParam?.title || "Learn more";

  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-3xl mb-4">
      <div className="prose">
        <br />
        <br />
        <UniformText
          placeholder="heading content goes here"
          parameterId="heading"
          as="h1"
          className="text-4xl font-bold"
        />
        <br />
        <UniformRichText
          placeholder="Rich text content goes here"
          parameterId="content"
        />
        {linkHref && (
          <div className="mt-6">
            <Link
              href={linkHref}
              className="text-blue-600 hover:text-blue-800 underline text-lg"
            >
              {linkText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
