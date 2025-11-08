import type { BlindBoxCategory } from "./blindBoxCategory";

export interface BlindBox {
  id: number;
  name: string;
  category: BlindBoxCategory;
  brandId: number;
  rarity: string;
  price: number;
  releaseDate: string;
  stock: number;
}

export interface BlindBoxRequest {
  name: string;
  categoryId: number;
  brandId: number;
  rarity: string;
  price: number;
  stock: number;
}