<template>
    <NuxtImg id="logo"  src="logo-top-trans/logo-top-trans.webp" preset="responsive"  alt="logo"/>
</template>

<style scoped>


 img,  svg {
  width: 50px;
  height: 100%;
 
  transform-origin: center;
  display: block;
  transition: 0.2s;
  transform: scale(0.9);
}

 img:hover,  svg:hover {
  transform: scale(1.0);
  transition: 0.2s;
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
