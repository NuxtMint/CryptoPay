<template>
  <div class="relative min-h-screen bg-slate-900 overflow-x-hidden">
    <div class="container mx-auto px-6 py-8 text-white">
      <!-- Success Message -->
      <div class="max-w-2xl mx-auto text-center">
        <div class="flex justify-center mb-8">
          <div
            class="bg-green-500/20 p-4 flex items-center justify-center rounded-full"
          >
            <Icon name="mdi:check-circle" class="h-16 w-16 text-green-400" />
          </div>
        </div>
        <h1
          class="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
        >
          Payment under review
        </h1>
        <p class="text-gray-300 mb-8">
          Thank you for your purchase! Our team is currently reviewing your
          payment.
        </p>

        <!-- Status Card -->
        <div
          class="bg-slate-800/50 rounded-2xl p-8 border border-blue-500/20 mb-8"
        >
          <div class="flex items-center justify-center mb-6">
            <div
              class="bg-blue-500/20 p-3 flex items-center justify-center rounded-full animate-pulse"
            >
              <Icon name="mdi:clock-outline" class="h-6 w-6 text-blue-400" />
            </div>
            <span class="ml-3 text-xl font-semibold">Payment Under Review</span>
          </div>
          <p class="text-gray-300">
            Once your payment is validated, you'll be able to access your
            personal space and start using ZeroTraceVPN.
          </p>
        </div>

        <!-- Next Steps -->
        <div class="space-y-6 mb-12">
          <div class="bg-slate-800/30 p-6 rounded-xl">
            <h3 class="text-xl font-semibold mb-4">Next Steps</h3>
            <div class="space-y-4">
              <div class="flex items-start">
                <Icon
                  name="mdi:numeric-1-circle"
                  class="h-6 w-6 text-blue-400 mr-3 flex-shrink-0"
                />
                <p class="text-gray-300 text-left">
                  Wait for payment validation (usually takes 1-10 hours)
                </p>
              </div>
              <div class="flex items-start">
                <Icon
                  name="mdi:numeric-2-circle"
                  class="h-6 w-6 text-blue-400 mr-3 flex-shrink-0"
                />
                <p class="text-gray-300 text-left">
                  Access your personal space at
                  <NuxtLink to="/u" class="text-blue-400 hover:text-blue-300"
                    >/u</NuxtLink
                  >
                </p>
              </div>
              <div class="flex items-start">
                <Icon
                  name="mdi:numeric-3-circle"
                  class="h-6 w-6 text-blue-400 mr-3 flex-shrink-0"
                />
                <p class="text-gray-300 text-left">
                  Download and set up the VPN client
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            to="/u"
            class="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-semibold transition text-center"
          >
            Go to Personal Space
          </NuxtLink>
          <NuxtLink
            to="/"
            class="border border-blue-500 hover:bg-blue-500/10 px-8 py-3 rounded-full font-semibold transition text-center"
          >
            Return to Homepage
          </NuxtLink>
        </div>
      </div>

      <!-- Support Section -->
      <div class="mt-12 text-center">
        <p class="text-gray-400">
          Need help?
          <a href="#" class="text-blue-400 hover:text-blue-300"
            >Contact Support</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Redirect if accessed directly without payment
onMounted(() => {
  // You might want to add logic here to verify if the user came from a valid payment
  // For now, we'll leave it open for demonstration
});
</script>
