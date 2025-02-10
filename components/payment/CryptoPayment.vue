<template>
  <div class="max-w-4xl mx-auto">
    <!-- Back Button -->
    <button
      class="mb-8 flex items-center text-blue-400 hover:text-blue-300"
      @click="$emit('back')"
    >
      <Icon name="mdi:arrow-left" class="h-5 w-5 mr-2" />
      Choose different payment method
    </button>

    <!-- Warning Message -->
    <div
      class="mb-8 p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 flex items-center"
    >
      <Icon name="mdi:alert" class="h-5 w-5 mr-2" />
      <span>Do NOT reload this page during payment process</span>
    </div>

    <div class="grid grid-cols-1 gap-8">
      <div class="bg-slate-800/50 rounded-2xl p-8 border border-blue-500/20">
        <div class="flex items-center mb-6">
          <Icon name="mdi:bitcoin" class="h-8 w-8 text-blue-400 mr-3" />
          <h2 class="text-2xl font-bold">Cryptocurrency</h2>
        </div>

        <!-- Crypto Selection if no crypto is selected -->
        <div v-if="!selectedCrypto" class="grid grid-cols-2 gap-4">
          <div
            v-for="crypto in cryptoOptions"
            :key="crypto.id"
            class="bg-slate-700/30 p-4 rounded-xl cursor-pointer hover:bg-slate-700/50 transition-colors"
            @click="$emit('selectCrypto', crypto.id)"
          >
            <div class="flex items-center space-x-3 mb-2">
              <Icon :name="crypto.icon" class="h-6 w-6 text-blue-400" />
              <span class="font-semibold">{{ crypto.name }}</span>
            </div>
            <div class="text-sm text-gray-400 ml-9">
              Network: {{ crypto.network }}
            </div>
          </div>
        </div>

        <!-- Selected Crypto Payment Details -->
        <div v-else>
          <!-- Back to crypto selection -->
          <button
            class="mb-6 flex items-center text-blue-400 hover:text-blue-300"
            @click="$emit('selectCrypto', null)"
          >
            <Icon name="mdi:arrow-left" class="h-5 w-5 mr-2" />
            Choose different crypto
          </button>

          <!-- Network Warning -->
          <div
            class="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/40 rounded-xl text-yellow-300 flex items-center"
          >
            <Icon name="mdi:alert" class="h-5 w-5 mr-2 flex-shrink-0" />
            <span>
              Only send {{ selectedCryptoDetails?.name }} through the
              {{ selectedCryptoDetails?.network }} network
            </span>
          </div>

          <!-- Timer bar -->
          <div
            class="relative h-1 bg-slate-700/30 rounded-full overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 h-full bg-blue-400 transition-all duration-1000 ease-linear"
              :style="{ width: `${timerProgress}%` }"
            ></div>
          </div>
          <div class="text-xs text-gray-400 text-center mb-12">
            Prices update in {{ Math.ceil(timeUntilNextUpdate) }}s
          </div>

          <!-- Payment Details -->
          <div class="bg-slate-700/30 p-4 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">{{
                selectedCryptoDetails?.name
              }}</span>
              <div class="flex items-center relative">
                <Icon
                  name="mdi:content-copy"
                  class="h-5 w-5 text-blue-400 cursor-pointer"
                  :class="{ 'animate-copy': copiedAddress }"
                  @click="copyAddress"
                />
                <span
                  v-if="copiedAddress"
                  class="absolute left-6 -top-8 bg-slate-700 text-gray-200 px-3 py-1 rounded text-sm whitespace-nowrap"
                >
                  Copied to clipboard
                </span>
              </div>
            </div>
            <div class="text-sm text-gray-300 break-all mb-2">
              {{ selectedCryptoDetails?.address }}
            </div>
            <div class="text-sm text-blue-400">
              Send: {{ cryptoAmounts[selectedCrypto] }}
              {{ selectedCrypto?.toUpperCase() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { cryptoOptions, cryptoAddresses, cryptoNames } from '~/config/crypto';
import type { CryptoType } from '~/config/crypto';

const props = defineProps<{
  selectedCrypto: CryptoType | null;
  cryptoAmounts: { [key: string]: string };
  timerProgress: number;
  timeUntilNextUpdate: number;
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'selectCrypto', crypto: CryptoType | null): void;
}>();

const copiedAddress = ref(false);

const selectedCryptoDetails = computed(() => {
  if (!props.selectedCrypto) return null;

  return {
    name: cryptoNames[props.selectedCrypto],
    address: cryptoAddresses[props.selectedCrypto],
    network: cryptoOptions.find((c) => c.id === props.selectedCrypto)?.network,
  };
});

const copyAddress = () => {
  if (!selectedCryptoDetails.value?.address) return;

  navigator.clipboard.writeText(selectedCryptoDetails.value.address);
  copiedAddress.value = true;
  setTimeout(() => {
    copiedAddress.value = false;
  }, 2000);
};
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
