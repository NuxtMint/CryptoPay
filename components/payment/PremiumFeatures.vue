<template>
  <div>
    <div class="flex items-center mb-6">
      <Icon name="mdi:shield-check" class="h-8 w-8 text-blue-400 mr-3" />
      <h2 class="text-2xl font-bold">Premium Plan</h2>
    </div>

    <p class="text-gray-300 mb-4">Advanced protection with premium features</p>

    <ul class="space-y-3 mb-6">
      <li class="flex items-center text-gray-300">
        <Icon name="mdi:check-circle" class="h-5 w-5 text-blue-400 mr-2" />
        <span>Faster servers</span>
      </li>
      <li class="flex items-center text-gray-300">
        <Icon name="mdi:check-circle" class="h-5 w-5 text-blue-400 mr-2" />
        <span>Priority support</span>
      </li>
      <li class="flex items-center text-gray-300">
        <Icon name="mdi:check-circle" class="h-5 w-5 text-blue-400 mr-2" />
        <span>Multi-device support</span>
      </li>
    </ul>

    <div class="flex items-center justify-between">
      <p class="text-2xl font-bold">
        €{{ prices.premium
        }}<span class="text-sm text-gray-400"> for 30 days</span>
      </p>
      <div class="crypto-price">0.0006 BTC/month</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  prices: {
    basic: number;
    premium: number;
  };
}>();
</script>
