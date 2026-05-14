export type PlaceType = 'Kawiarnia' | 'Restauracja' | 'Hotel' | 'Kultura' | 'Zakupy' | 'Przyroda' | 'Piekarnia';

export interface Place {
  id: string;
  name: string;
  type: PlaceType;
  location: string;
  description: string;
  imageUrl?: string;
  isSaved?: boolean;
  category?: string; // e.g. "JEDZENIE", "KULTURA"
  // Authenticity Signals
  localReviewPercent?: number;
  hasOwnerResponse?: boolean;
  regularsPresent?: boolean;
  isAuthenticVerified?: boolean;
  // Practical Info
  openingHours?: string;
  reservationRequired?: boolean;
  priceLevel?: number; // 1-4
  suitabilityTags?: string[]; // e.g. ["Wieczór", "Solo", "Relaks"]
}

export interface CityGroup {
  city: string;
  country: string;
  places: Place[];
}

export interface EditorialRecommendation {
  id: string;
  name: string;
  location: string;
  type: string;
  imageUrl: string;
}

export interface CityEditorial {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  description?: string;
  curatedPlaces?: Place[];
}
