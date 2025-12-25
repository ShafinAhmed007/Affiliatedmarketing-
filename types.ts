export interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  rating: number; // 0 to 5
  reviewCount: number;
  logoUrl: string; // Placeholder capable
  shortDescription: string;
  fullDescription: string;
  pros: string[];
  cons: string[];
  pricing: PricingTier[];
  verdict: string;
  affiliateLink: string;
  bestFor: string;
}

export type LegalPageType = 'privacy' | 'terms' | 'disclosure';