export interface Brand {
  id: number;
  name: string;
  countryOfOrigin: string;
}

export interface BrandRequest {
  name: string;
  countryOfOrigin: string;
}