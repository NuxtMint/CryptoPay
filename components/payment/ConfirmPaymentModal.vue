<template>
  <div
    class="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
  >
    <div
      class="bg-slate-800 rounded-lg p-8 max-w-xl w-full border border-slate-600 shadow-xl"
    >
      <!-- Warning Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-amber-500/10 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      <h3 class="text-2xl font-bold text-white mb-4 text-center">
        Important: Save Your Order ID
      </h3>

      <!-- Order ID Display -->
      <div class="bg-slate-700 rounded-lg p-4 mb-6">
        <p class="text-gray-400 text-sm mb-2">Your Order ID:</p>
        <div class="flex items-center justify-between gap-2">
          <code class="text-lg font-mono text-amber-400">{{ orderId }}</code>
          <button
            @click="copyOrderId"
            class="text-sm px-3 py-1.5 bg-slate-600 hover:bg-slate-500 rounded-md text-white transition-colors flex items-center gap-2"
          >
            <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <p class="text-gray-300 mb-2 text-xs">
        Please save this Order ID somewhere safe. You'll need it to:
      </p>
      <ul
        class="list-disc list-inside text-xs mb-6 text-left space-y-1 text-gray-300"
      >
        <li>Track your payment status</li>
        <li>Contact support if needed</li>
        <li>Access your purchase details</li>
      </ul>

      <!-- Order ID Confirmation Input -->
      <div class="mb-6">
        <label class="block text-gray-300 text-sm mb-2"
          >Please paste your Order ID to confirm you saved it:</label
        >
        <input
          v-model="confirmedOrderId"
          type="text"
          class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
          placeholder="Paste your Order ID here"
        />
        <p v-if="isError" class="text-red-400 text-sm mt-2">
          The Order ID doesn't match. Please copy and paste it correctly.
        </p>
      </div>

      <div class="flex flex-col space-y-3">
        <button
          @click="confirmOrderId"
          :disabled="!confirmedOrderId.length"
          :class="[
            'w-full px-4 py-3 rounded-lg font-semibold transition-colors',
            confirmedOrderId.length
              ? 'bg-amber-500 text-slate-900 hover:bg-amber-400'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed',
          ]"
        >
          Confirm and Continue
        </button>
        <button
          @click="$emit('close')"
          class="w-full px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
        >
          Go back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  orderId: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

const copied = ref(false);
const confirmedOrderId = ref('');
const isError = ref(false);

const copyOrderId = async () => {
  try {
    await navigator.clipboard.writeText(props.orderId);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const confirmOrderId = () => {
  if (confirmedOrderId.value === props.orderId) {
    isError.value = false;
    emit('confirm');
  } else {
    isError.value = true;
  }
};
</script>
