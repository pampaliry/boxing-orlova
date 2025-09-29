<template>
  <span class="handwave" aria-hidden="true">👋</span>
</template>

<style scoped>
@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

.handwave {
  display: inline-block;
  transform-origin: 70% 70%;
  animation: wave 2s infinite;
  font-size: 2.5em !important;
}
</style>
