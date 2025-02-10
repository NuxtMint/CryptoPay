<template>
  <div class="relative min-h-screen bg-slate-900 overflow-x-hidden">
    <div class="container mx-auto px-6 py-8 text-white">
      <PaymentPackageSelection
        :selected-package="selectedPackage"
        :prices="prices"
        @select="handlePackageSelection"
      />

      <PaymentMethodSelection
        v-if="selectedPackage && !selectedPaymentMethod"
        @select="selectedPaymentMethod = $event"
        @back="selectedPackage = null"
        @show-how-to-buy="showHowToBuyModal = true"
      />

      <PaymentCryptoPayment
        v-if="selectedPackage && selectedPaymentMethod === 'crypto'"
        :selected-crypto="selectedCrypto"
        :crypto-amounts="cryptoAmounts"
        :timer-progress="timerProgress"
        :time-until-next-update="timeUntilNextUpdate"
        @select-crypto="handleCryptoSelection"
        @back="selectedPaymentMethod = null"
      />

      <PaymentOrderSummary
        :order-id="orderId"
        :selected-package="selectedPackage"
        :prices="prices"
        @copy="copyToClipboard"
      />

      <div v-if="selectedCrypto" class="mt-8 flex justify-center">
        <button
          @click="handlePaymentConfirmation"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Confirm Payment
        </button>
      </div>
    </div>

    <PaymentHowToBuyCryptoModal
      v-if="showHowToBuyModal"
      :crypto-exchanges="cryptoExchanges"
      @close="showHowToBuyModal = false"
    />

    <PaymentConfirmPaymentModal
      v-if="showConfirmModal"
      :order-id="orderId"
      @close="showConfirmModal = false"
      @confirm="processPaymentConfirmation"
    />
  </div>
</template>

<script setup lang="ts">
import { type CryptoType } from '~/config/crypto';
import { defaultPrices } from '~/config/site';
type PackageType = 'basic' | 'premium';

const orderId = ref('');

const copiedStates = ref<{ [key: string]: boolean }>({});

const copyToClipboard = (text: string, id: string) => {
  navigator.clipboard.writeText(text);
  copiedStates.value[id] = true;
  setTimeout(() => {
    copiedStates.value[id] = false;
  }, 2000);
};

const prices = ref<{ basic: number; premium: number }>({
  basic: 39,
  premium: 69,
});

const fetchPrices = async () => {
  try {
    const response = await fetch('/api/package-prices');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    prices.value = data;
  } catch (error) {
    console.error('Error fetching package prices:', error);
    // Fallback to default prices if fetch fails
    prices.value = defaultPrices;
  }
};

const orderAmount = computed(
  () => prices.value[selectedPackage.value || 'basic']
);

const UPDATE_INTERVAL = 60000 * 5; // 60 seconds (1 minute)
const timerProgress = ref(100);
const timeUntilNextUpdate = ref(UPDATE_INTERVAL / 1000);

// Modify updateCryptoPrices to remove timer reset logic
const updateCryptoPrices = async () => {
  try {
    const response = await fetch('/api/crypto-prices');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const prices = await response.json();

    // Validate the response structure
    if (
      !prices?.bitcoin?.eur ||
      !prices?.ethereum?.eur ||
      !prices?.solana?.eur ||
      !prices?.['matic-network']?.eur
    ) {
      throw new Error('Invalid price data structure');
    }

    // Calculate amounts (orderAmount divided by price)
    cryptoAmounts.value = {
      btc: (orderAmount.value / prices.bitcoin.eur).toFixed(8),
      eth: (orderAmount.value / prices.ethereum.eur).toFixed(6),
      sol: (orderAmount.value / prices.solana.eur).toFixed(4),
      matic: (orderAmount.value / prices['matic-network'].eur).toFixed(2),
    };
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // Set fallback values when there's an error
    cryptoAmounts.value = {
      btc: '...',
      eth: '...',
      sol: '...',
      matic: '...',
    };
  }
};

// Only generate order ID on mount
onMounted(async () => {
  // Generate a more secure order ID
  const timestamp = Date.now().toString(36);
  const random1 = Math.random().toString(36).substring(2, 10).toUpperCase();
  const random2 = crypto
    .randomUUID()
    .replace(/-/g, '')
    .substring(0, 12)
    .toUpperCase();
  orderId.value = `ORD${timestamp}${random1}${random2}`;

  // Fetch prices
  await fetchPrices();
});

const selectedPaymentMethod = ref<'crypto' | 'card' | null>(null);
const selectedCrypto = ref<CryptoType | null>(null);
let timerInterval: ReturnType<typeof setInterval> | null = null;

// Add this function to handle timer cleanup
const clearCryptoTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

// Update the updateTimer function
const updateTimer = () => {
  // Clear any existing timer first
  clearCryptoTimer();

  timeUntilNextUpdate.value = UPDATE_INTERVAL / 1000;
  timerProgress.value = 100;

  // First update prices immediately
  updateCryptoPrices();

  return setInterval(async () => {
    if (!selectedCrypto.value) {
      clearCryptoTimer();
      return;
    }

    timeUntilNextUpdate.value = Math.max(0, timeUntilNextUpdate.value - 0.1);
    timerProgress.value =
      (timeUntilNextUpdate.value / (UPDATE_INTERVAL / 1000)) * 100;

    // When timer reaches 0, update prices and reset timer
    if (timeUntilNextUpdate.value <= 0) {
      await updateCryptoPrices();
      timeUntilNextUpdate.value = UPDATE_INTERVAL / 1000;
      timerProgress.value = 100;
    }
  }, 100);
};

// Update the handleCryptoSelection function
const handleCryptoSelection = async (cryptoId: CryptoType | null) => {
  selectedCrypto.value = cryptoId;

  if (cryptoId) {
    // Start new timer which will also update prices immediately
    timerInterval = updateTimer();
  } else {
    clearCryptoTimer();
  }
};

// Update onUnmounted to use the clearCryptoTimer function
onUnmounted(() => {
  clearCryptoTimer();
});

const confirmPayment = async () => {
  try {
    // Prepare order data with proper typing
    const orderData = {
      orderId: orderId.value,
      plan: selectedPackage.value as PackageType,
      paymentMethod: selectedPaymentMethod.value as 'crypto' | 'card',
      cryptoType: selectedCrypto.value || undefined,
      cryptoAmount: selectedCrypto.value
        ? Number(cryptoAmounts.value[selectedCrypto.value])
        : undefined,
    };

    // Submit to API
    const { data, error } = await useFetch('/api/submit-order', {
      method: 'POST',
      body: orderData,
    });

    if (error.value) {
      throw new Error('Failed to submit order');
    }

    // If successful, redirect to success page
    await navigateTo('/success');
  } catch (error) {
    console.error('Error confirming payment:', error);
    // TODO: Add error handling UI feedback
  }
};

const showConfirmModal = ref(false);

const handlePaymentConfirmation = () => {
  showConfirmModal.value = true;
};

const processPaymentConfirmation = async () => {
  showConfirmModal.value = false;
  await confirmPayment();
};

const selectedPackage = ref<'basic' | 'premium' | null>(null);

const handlePackageSelection = async (pkg: 'basic' | 'premium') => {
  selectedPackage.value = pkg;
  // Update crypto prices if crypto is already selected
  if (selectedCrypto.value) {
    await updateCryptoPrices();
  }
};

const cryptoAmounts = ref<{ [key: string]: string }>({
  btc: '...',
  eth: '...',
  sol: '...',
  matic: '...',
});

const showHowToBuyModal = ref(false);

// TODO : Extract to a config file?
const cryptoExchanges = [
  {
    name: 'MoonPay',
    favicon: 'https://www.google.com/s2/favicons?domain=moonpay.com&sz=128',
    description:
      'Simple and fast crypto purchases with credit card, bank transfer, or Apple/Google Pay. Available in 150+ countries.',
    url: 'https://www.moonpay.com/buy',
    guideUrl:
      'https://support.moonpay.com/hc/en-gb/articles/360011930117-How-do-I-buy-cryptocurrency-',
  },
  {
    name: 'Paybis',
    favicon: 'https://www.google.com/s2/favicons?domain=paybis.com&sz=128',
    description:
      'Fast crypto purchases available in 180+ countries. Supports credit/debit cards, Apple Pay, and bank transfers with no hidden fees.',
    url: 'https://paybis.com',
    guideUrl: 'https://paybis.com/faq/',
  },
  {
    name: 'Coinbase',
    favicon: 'https://www.google.com/s2/favicons?domain=coinbase.com&sz=128',
    description:
      'Perfect for beginners. Easy to use interface with instant buy options using credit card or bank transfer.',
    url: 'https://www.coinbase.com',
    guideUrl:
      'https://help.coinbase.com/en/coinbase/trading-and-funding/buying-selling-or-converting-crypto/how-do-i-buy-digital-currency',
  },
  {
    name: 'Binance',
    favicon: 'https://www.google.com/s2/favicons?domain=binance.com&sz=128',
    description:
      'Largest crypto exchange by volume. Offers competitive fees and a wide variety of payment methods.',
    url: 'https://www.binance.com',
    guideUrl:
      'https://www.binance.com/en/support/faq/how-to-buy-cryptocurrency-on-binance-homepage-360043512072',
  },
  {
    name: 'Kraken',
    favicon: 'https://www.google.com/s2/favicons?domain=kraken.com&sz=128',
    description:
      'Established exchange with strong security focus. Popular in Europe with SEPA transfer support.',
    url: 'https://www.kraken.com',
    guideUrl:
      'https://support.kraken.com/hc/en-us/articles/360051144472-The-basics-of-trading-crypto',
  },
];
</script>

<style scoped>
@keyframes copyRotate {
  0% {
    transform: scale(1) rotate(0deg);
  }
  30% {
    transform: scale(1.2) rotate(-10deg);
  }
  60% {
    transform: scale(1.2) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.animate-copy {
  animation: copyRotate 0.5s ease-in-out;
}
</style>
