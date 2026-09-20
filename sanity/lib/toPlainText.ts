interface PortableTextBlock {
  _type: string;
  children?: { text?: string }[];
}

// Flattens portable text (rich body/description) into a plain string for
// places that cannot render rich text (e.g. og:description, excerpts).
export function toPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks) return "";
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => (block.children ?? []).map((c) => c.text ?? "").join(""))
    .join(" ")
    .trim();
}
