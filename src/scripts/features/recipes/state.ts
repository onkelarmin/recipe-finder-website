import type { Variant } from "@/domain/filters";

export type Filters = {
  [K in Variant]: number | null;
};

export const filters: Filters = {
  prep: null,
  cook: null,
};

export const search = {
  query: "",
};
