import { imageFrom } from "@uniformdev/assets";

export const formatDate = (dateField: any): string => {
  if (!dateField?.datetime) return "";
  return new Date(dateField.datetime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const GetImageUrl = (imageAssets: any) => {
  if (!imageAssets || !Array.isArray(imageAssets)) return undefined;

  const [firstAsset] = imageAssets;
  const imageUrl = firstAsset
    ? imageFrom(firstAsset)
        .transform({
          width: 1200, // High resolution for featured images
          fit: "cover", // Smart crop to maintain aspect ratio
          focal: firstAsset.fields?.focalPoint?.value || "center", // Focal point support for precise positioning
        })
        .url()
    : undefined;
  return imageUrl;
};
