<template>
  <div class="error-container bg-gray-950/50 relative">
    <AnimatedBackground class="inset-0 z-0" />

    <h1 class="error-title">{{ error.statusCode === 404 ? '404' : '500' }}</h1>
    <p class="error-message">
      {{
        error.statusCode === 404
          ? 'Page not found'
          : 'An error occurred on the server'
      }}
    </p>
    <NuxtLink to="/" class="back-button"> Return to Home </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
}

.error-title {
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2d3748;
}

.error-message {
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 2rem;
}

.back-button {
  padding: 0.75rem 1.5rem;
  background-color: #4a5568;
  color: white;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #2d3748;
}
</style>
