<template>
  <div
    class="flex flex-col gap-2 my-4 border-t border-b border-gray-700/50 py-4"
  >
    <div class="flex justify-between items-center group relative">
      <div class="flex items-center gap-2">
        <span class="text-gray-400">Order ID</span>
        <div
          v-if="copied"
          class="text-xs text-green-500 animate-fade-in-out absolute -bottom-6 right-0"
        >
          Copied to clipboard!
        </div>
      </div>

      <div
        class="flex items-center gap-3 px-3 py-1.5 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
        @click="handleCopy"
        :class="copied ? 'ring-1 ring-green-500/50' : ''"
      >
        <span class="font-mono text-sm text-gray-300 select-all">{{
          orderId
        }}</span>
        <div
          class="p-1 flex items-center justify-center rounded-md transition-colors"
          :class="copied ? 'bg-green-500/10' : 'group-hover:bg-gray-700'"
        >
          <Icon
            :name="
              copied
                ? 'material-symbols:check'
                : 'material-symbols:content-copy-outline'
            "
            class="w-4 h-4 transition-all"
            :class="
              copied
                ? 'text-green-500'
                : 'text-gray-400 group-hover:text-gray-200'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  orderId: string;
}>();

const emit = defineEmits<{
  (e: 'copy', text: string, id: string): void;
}>();

const copied = ref(false);

const handleCopy = () => {
  emit('copy', props.orderId, 'order-id');
  copied.value = true;

  // Reset copied state after 2 seconds
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<style scoped>
.animate-fade-in-out {
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-5px);
  }
}
</style>
