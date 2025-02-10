<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    @click="$emit('close')"
  >
    <div
      class="bg-slate-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
      @click.stop
    >
      <!-- Header -->
      <div
        class="p-6 border-b border-slate-700 flex justify-between items-center"
      >
        <h2 class="text-xl font-semibold text-white">
          How to Buy Cryptocurrency
        </h2>
        <button
          class="text-slate-400 hover:text-white transition-colors"
          @click="$emit('close')"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
        <p class="text-slate-300 mb-6">
          Select one of these trusted exchanges to purchase cryptocurrency. Most
          exchanges support credit cards and bank transfers.
        </p>

        <div class="space-y-4">
          <div
            v-for="exchange in cryptoExchanges"
            :key="exchange.name"
            class="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700/70 transition-colors"
          >
            <div class="flex items-center gap-4 mb-3">
              <img
                :src="exchange.favicon"
                :alt="exchange.name"
                class="w-8 h-8 rounded"
              />
              <h3 class="text-lg font-medium text-white">
                {{ exchange.name }}
              </h3>
            </div>
            <p class="text-slate-300 mb-4">{{ exchange.description }}</p>
            <div class="flex gap-3">
              <a
                :href="exchange.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Visit Website
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
              <a
                :href="exchange.guideUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                View Guide
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CryptoExchange {
  name: string;
  favicon: string;
  description: string;
  url: string;
  guideUrl: string;
}

defineProps<{
  cryptoExchanges: CryptoExchange[];
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>
