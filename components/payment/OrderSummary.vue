<template>
  <div
    class="bg-gradient-to-br max-w-4xl mx-auto mt-8 from-slate-800/40 to-slate-800/20 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
  >
    <h3
      class="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
    >
      Order Summary
    </h3>

    <!-- Package Details -->
    <div class="space-y-4 mb-6">
      <div class="flex justify-between items-center">
        <div class="flex flex-col">
          <span class="text-lg font-medium">
            {{ selectedPackage === 'premium' ? 'Premium' : 'Basic' }} Plan
          </span>
          <span class="text-sm text-slate-400">1 Year Subscription</span>
        </div>
        <span class="text-lg font-semibold"
          >€{{ prices[selectedPackage || 'basic'] }}</span
        >
      </div>
    </div>

    <!-- Order ID Section -->
    <PaymentOrderId :order-id="orderId" @copy="copyToClipboard" class="mb-6" />

    <!-- Total -->
    <div class="flex justify-between items-center">
      <span class="text-lg font-medium">Total</span>
      <div class="flex flex-col items-end">
        <span
          class="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
        >
          €{{ prices[selectedPackage || 'basic'] }}
        </span>
        <span class="text-sm text-slate-400">Tax included</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  orderId: string;
  selectedPackage: 'basic' | 'premium' | null;
  prices: { basic: number; premium: number };
}>();

const emit = defineEmits<{
  (e: 'copy', text: string, id: string): void;
}>();

const copyToClipboard = (text: string, id: string) => {
  emit('copy', text, id);
};
</script>
