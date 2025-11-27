<template>
  <div class="logo-wrapper" >
   <picture >
  <!-- Desktop 1024+ -->
  <source 
    media="(min-width: 1024px)"
    srcset="/imgs/optimized/logo-top-trans/logo-top-trans-1024.webp"
    type="image/webp"
  />

  <!-- Tablet 640+ -->
  <source 
    media="(min-width: 640px)"
    srcset="/imgs/optimized/logo-top-trans/logo-top-trans-640.webp"
    type="image/webp"
  />

  <!-- Mobile 320+ -->
  <source 
    media="(min-width: 320px)"
    srcset="/imgs/optimized/logo-top-trans/logo-top-trans-320.webp"
    type="image/webp"
  />

  <!-- Fallback (default) -->
  <img 
    src="/imgs/optimized/logo-top-trans/logo-top-trans.webp"
    alt="Logo Box Club Orlová"
    class="logo"
    width="400"
    height="400"
    loading="lazy"
    decoding="async"
  />
</picture>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}


.logo {
  /*animation: spin 12s linear infinite;*/
}

.logo-wrapper:hover{
.logo{
  scale: 1;
}
}
.logo {
  user-select: none;
  pointer-events: none;
  width: 4rem;
  height: auto;
  padding: 5px !important;
  scale: .9; 
  transition: .2s;
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
