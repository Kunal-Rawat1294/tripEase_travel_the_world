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

export interface DocsSection {
    title: string;
    description: string;
    passportRequirements: {
        title: "Passport Requirements";
        validity: string;
        blankPages: string;
        ePassport: boolean;
    };
    visaRequirements: {
        title: "Visa Information";
        visaFreeEntry: string;
        "e-visa": string;
        visaOnArrival: string;
        embassyProcessing: string;
    };
    entryExit: {
        title: "Entry and Exit Requirements";
        customsDeclaration: string;
        healthCertificates: string;
        specialPermits: string;
    };
    officialLinks: {
        title: "Official Resources";
        embassyUrl: string;
    };
}


export interface CountryDetails {
  name: string;
  docs: DocsSection;
  culture: InfoSection;
  safety: InfoSection;
  health: InfoSection;
  money: InfoSection;
  connectivity: InfoSection;
  adaptation: InfoSection;
}
