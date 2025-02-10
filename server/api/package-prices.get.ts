import { defineEventHandler } from 'h3';
import { defaultPrices } from '~/config/site';

const packages = {
  basic: {
    name: 'Trial Plan',
    price: defaultPrices.basic,
  },
  premium: {
    name: 'Premium Plan',
    price: defaultPrices.premium,
  },
};

export default defineEventHandler(async () => {
  try {
    return {
      basic: packages.basic.price,
      premium: packages.premium.price,
    };
  } catch (error) {
    console.error('Error fetching package prices:', error);
    return defaultPrices;
  }
});
