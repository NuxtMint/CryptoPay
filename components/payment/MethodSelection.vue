<template>
  <div class="max-w-4xl mx-auto">
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Crypto Selection Card -->
      <div
        class="bg-slate-800/50 rounded-2xl p-8 border border-blue-500/20 cursor-pointer hover:border-blue-500/50 transition-colors"
        @click="$emit('select', 'crypto')"
      >
        <div class="flex items-center mb-6">
          <Icon name="mdi:bitcoin" class="h-8 w-8 text-blue-400 mr-3" />
          <h2 class="text-2xl font-bold">Cryptocurrency</h2>
        </div>
        <p class="text-gray-300">Pay with BTC, ETH, SOL, or MATIC</p>
        <button
          class="mt-4 text-sm text-blue-400 hover:text-blue-300 flex items-center"
          @click.stop="$emit('showHowToBuy')"
        >
          <Icon name="mdi:help-circle" class="h-4 w-4 mr-1" />
          How to buy crypto?
        </button>
      </div>

      <!-- Card Payment Selection Card -->
      <NuxtLink
        external
        :to="stripeLink"
        class="bg-slate-800/50 rounded-2xl p-8 border border-blue-500/20 cursor-pointer hover:border-blue-500/50 transition-colors"
      >
        <div class="flex items-center mb-6">
          <Icon name="mdi:credit-card" class="h-8 w-8 text-blue-400 mr-3" />
          <h2 class="text-2xl font-bold">Card Payment</h2>
        </div>
        <p class="text-gray-300">Pay with credit or debit card</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~/config/site';
defineEmits<{
  (e: 'select', method: 'crypto' | 'card'): void;
  (e: 'back'): void;
  (e: 'showHowToBuy'): void;
}>();

const stripeLink = siteConfig.stripeLink;
</script>
