<template>
  <div class="logo-wrapper">
    <NuxtImg
      src="/logo-top-trans.webp"
      alt="logo"
      width="120"
      height="120"
      class="logo"
    />
  </div>
</template>

<script setup>
</script>

<style scoped>
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Rotácia bola v pôvodnej verzii zakomentovaná */
/*
.logo {
  animation: spin 12s linear infinite;
}
*/

.logo {
  user-select: none;
  pointer-events: none;
  width: 100%;
  height: auto;
  padding: 25%
}

/*
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
*/
</style>
