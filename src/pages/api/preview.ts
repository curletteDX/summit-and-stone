import { createPreviewHandler } from "@uniformdev/canvas-next";

export default createPreviewHandler({
  resolveFullPath: (options) => {
    if (options.path) return options.path;
    if (options.slug) return options.slug;
    if (options.id) return options.id;
    return undefined;
  },
  secret: () => process.env.UNIFORM_PREVIEW_SECRET || "",
  playgroundPath: "/uniform-playground/pattern-playground",
});
