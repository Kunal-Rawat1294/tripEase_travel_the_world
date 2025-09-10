export interface Country {
  name: string;
  continent: string;
  description: string;
  image: string;
  slug: string;
}

export interface ContentSection {
  title: string;
  content: string;
}

export interface CountryDetails {
  name: string;
  content: {
    documents: ContentSection;
    culture: ContentSection;
    safety: ContentSection;
    health: ContentSection;
    money: ContentSection;
    connectivity: ContentSection;
    adaptation: ContentSection;
  };
}
