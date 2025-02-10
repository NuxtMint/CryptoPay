import { defineEventHandler } from 'h3';

// Cache prices in memory with timestamp
let priceCache = {
  timestamp: 0,
  data: null as any,
};

// Cache duration in milliseconds (1 minute)
const CACHE_DURATION = 60 * 1000;

export default defineEventHandler(async (event) => {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (priceCache.data && now - priceCache.timestamp < CACHE_DURATION) {
      return priceCache.data;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,matic-network&vs_currencies=eur',
      {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Nuxt Mint/1.0',
        },
      }
    );

    clearTimeout(timeoutId);

    if (response.status === 429) {
      console.warn('Rate limit hit, using fallback prices');
      throw new Error('Rate limit exceeded');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate the response structure
    const requiredCoins = ['bitcoin', 'ethereum', 'solana', 'matic-network'];
    for (const coin of requiredCoins) {
      if (!data[coin]?.eur) {
        throw new Error(`Missing price data for ${coin}`);
      }
    }

    // Update cache
    priceCache = {
      timestamp: now,
      data: data,
    };

    return data;
  } catch (error: any) {
    console.error('Server error fetching crypto prices:', error.message);

    // If we have stale cache data, use it as fallback
    if (priceCache.data) {
      return priceCache.data;
    }
    return error;
  }
});
