export interface BlindBoxCategory {
  id: number;
  name: string;
  description: string;
  rarityLevel: string;
  priceRange: string;
}

export interface BlindBoxCategoryRequest {
  name: string;
  description: string;
  rarityLevel: string;
  priceRange: string;
}