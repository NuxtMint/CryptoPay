interface SiteConfig {
  name: string;
  description: string;
  url: string;
  blogDescription: string;
  blogKeywords: string;
  stripeLink: string;
  author: {
    name: string;
    email: string;
    twitter: string;
  };
  social: {
    twitter: string;
    github: string;
    linkedin: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Nuxt Mint',
  description: 'Nuxt Mint - Your Privacy Matters',
  url: 'https://nuxtmint.com',
  stripeLink: 'https://yourstripelink.com',
  blogDescription:
    'Articles about Nuxt Mint, tech insights, and personal experiences',
  blogKeywords: 'Nuxt Mint, tech, insights, personal',
  author: {
    name: 'Nuxt Mint',
    email: 'your@email.com',
    twitter: '@yourwebsite',
  },
  social: {
    twitter: 'https://twitter.com/yourwebsite',
    github: 'https://github.com/yourwebsite',
    linkedin: 'https://linkedin.com/in/yourwebsite',
  },
};

export const defaultPrices = {
  basic: 10,
  premium: 20,
};
