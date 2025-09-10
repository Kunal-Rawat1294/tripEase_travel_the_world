export interface Country {
  name: string;
  continent: string;
  description: string;
  image: string;
  slug: string;
  iso2: string;
  iso3: string;
}

export interface ContentSection {
  title: string;
  content: string;
}

export interface CountryDetails {
  name: string;
  content: {
    [key: string]: ContentSection;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

    