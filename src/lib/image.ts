export const placeholderImage = "https://imageplaceholder.net/600";

export const normalizeImageUrl = (value: unknown) => {
  const normalized = typeof value === "string" ? value.trim() : "";

  if (!normalized || normalized === "#VALUE!" || normalized.startsWith("#")) {
    return placeholderImage;
  }

  return normalized;
};
