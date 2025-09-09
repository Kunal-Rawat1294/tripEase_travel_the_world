export interface Country {
  name: string;
  continent: string;
  description: string;
  image: string;
  slug: string;
}

export interface InfoSection {
  title: string;
  description: string;
  points: string[];
}

export interface CountryDetails {
  name: string;
  docs: InfoSection;
  culture: InfoSection;
  safety: InfoSection;
  health: InfoSection;
  money: InfoSection;
  connectivity: InfoSection;
  adaptation: InfoSection;
}
