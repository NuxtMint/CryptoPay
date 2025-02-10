<template>
  <div class="max-w-4xl mx-auto mb-12">
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Basic Package Card -->
      <div
        @click="$emit('select', 'basic')"
        class="bg-slate-800/50 rounded-2xl p-8 border cursor-pointer transition-colors"
        :class="[
          selectedPackage === 'basic'
            ? 'border-blue-500'
            : 'border-blue-500/20 hover:border-blue-500/50',
        ]"
      >
        <div class="flex items-center mb-6">
          <Icon name="mdi:shield-outline" class="h-8 w-8 text-blue-400 mr-3" />
          <h2 class="text-2xl font-bold">Basic Plan</h2>
        </div>
        <p class="text-gray-300 mb-4">Essential VPN protection</p>
        <div class="flex items-center justify-between">
          <p class="text-2xl font-bold">
            €{{ prices.basic
            }}<span class="text-sm text-gray-400"> for 30 days</span>
          </p>
          <div class="crypto-price">0.0003 BTC/month</div>
        </div>
      </div>

      <!-- Premium Package Card -->
      <div
        class="bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-2xl p-8 border cursor-pointer transition-all duration-300 relative overflow-hidden transform hover:scale-[1.02]"
        :class="[
          selectedPackage === 'premium'
            ? 'border-blue-400 shadow-lg shadow-blue-500/20'
            : 'border-blue-500/20 hover:border-blue-400/50',
        ]"
        @click="$emit('select', 'premium')"
      >
        <PaymentBestValueRibbon />
        <PaymentPremiumFeatures :prices="prices" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectedPackage: 'basic' | 'premium' | null;
  prices: { basic: number; premium: number };
}>();

defineEmits<{
  (e: 'select', pkg: 'basic' | 'premium'): void;
}>();
</script>
