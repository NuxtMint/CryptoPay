<template>
  <div class="min-h-screen bg-slate-900">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center text-white">
          <img
            src="/images/logo.png"
            alt="Logo"
            class="h-8 hover:scale-105 transition"
          />
          <span
            class="mx-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            ZeroTraceVPN
          </span>
          | The Blog
        </NuxtLink>
      </div>
    </nav>

    <main class="container mx-auto px-6 py-8">
      <slot />
    </main>

    <footer class="border-t border-gray-800 mt-16">
      <div class="container mx-auto px-6 py-8">
        <div class="text-center text-gray-400">
          © {{ new Date().getFullYear() }} Blog. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>
