# CryptoPay - Nuxt Application

A modern crypto payment service built with Nuxt 3, featuring crypto payments integration. Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

<div align="center">

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

A modern, feature-rich crypto payment service built with Nuxt 3, Vue 3, and TailwindCSS. Perfect for crypto enthusiasts, crypto bloggers, and crypto creators.

[Demo](https://btc.nuxtmint.com/) · [Report Bug](https://github.com/NuxtMint/CryptoPay/issues) · [Request Feature](https://github.com/NuxtMint/CryptoPay/issues)

</div>

## 💝 Support My Work

[![NuxtMint](https://nuxtmint.com/nuxt-mint-logo.png)](https://nuxtmint.com)

> This template and many others are available at [NuxtMint.com](https://nuxtmint.com)

[![Discord](https://img.shields.io/badge/Discord-Join_Us!-5865F2?style=for-the-badge&logo=discord)](https://discord.gg/dZF8tDgBrM)

> Join our friendly Discord community to get help, share your ideas, and connect with other developers!

## Setup

1. Clone the repository

2. Create a `.env` file in the root directory:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
```

3. Install dependencies:

```bash
# pnpm (recommended)
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

## Project Configuration

### Site Configuration (`config/site.ts`)

```typescript
export const siteConfig = {
  name: 'Your Site Name',
  description: 'Your site description',
  url: 'https://yoursite.com',
  stripeLink: 'https://your-stripe-payment-link',
  // ... other configurations
};
```

### Crypto Configuration (`config/crypto.ts`)

```typescript
export const cryptoAddresses = {
  btc: 'your-btc-address',
  eth: 'your-eth-address',
  sol: 'your-sol-address',
  matic: 'your-matic-address',
};
```

### Airtable Setup

1. Create a new base in Airtable
2. Create a table named "Orders" with fields:
   - Order ID (Single line text)
   - Plan (Single select: basic, premium)
   - Payment Method (Single select: crypto, bank)
   - Crypto Type (Single line text)
   - Crypto Amount (Number)
   - Created At (Date)

## Features

- 💳 Cryptocurrency payment integration
- 🎨 Responsive design
- 📊 Order management through Airtable
- 💱 Real-time crypto price updates
- ✅ Payment success page

## API Endpoints

### Configuration

The API endpoints are configured in the `server/api` directory. Make sure you have the following environment variables set up in your `.env` file:

```bash
# API Configuration
API_SECRET_KEY=your_api_secret_key
CRYPTO_API_KEY=your_crypto_api_key
```

### Available Endpoints

#### 1. GET `/api/crypto-prices`

Returns current cryptocurrency prices for supported tokens.

**Configuration:**

- Configure supported cryptocurrencies in `config/crypto.ts`

#### 2. GET `/api/package-prices`

Returns available package prices.

**Configuration:**
Edit `config/site.ts` to modify package prices:

```typescript
export const defaultPrices = {
  basic: 10,
  premium: 20,
};
```

#### 3. POST `/api/submit-order`

Handles order submission and Airtable integration.

**Configuration:**

1. Set up Airtable credentials in `.env`:

```bash
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
```

2. Configure Airtable settings in `config/airtable.ts`:

### Rate Limiting

All API endpoints are rate-limited to prevent abuse. Configure rate limiting in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  // ... other config
  security: {
    rateLimiter: {
      tokensPerInterval: 100,
    },
  },
});
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information about deploying to production.
