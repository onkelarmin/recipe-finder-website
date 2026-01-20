export const VARIANTS = ["prep", "cook"] as const;
export type Variant = (typeof VARIANTS)[number];

export function isVariant(value: string): value is Variant {
  return VARIANTS.includes(value as Variant);
}
