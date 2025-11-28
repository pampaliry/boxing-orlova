<script setup>
</script>

<template>
  <section class="hero-video-section overlay">

    <!-- VIDEO BACKGROUND -->
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      poster=""
    >
      <source src="/videos/leng-small.mp4" type="video/mp4" />
    </video>

    <!-- DARK  OVERLAY -->
    <div class="overlay"></div>

    <!-- CONTENT -->
    <div class="content">
      
      <picture >
  <!-- Desktop 1024+ -->
  <source 
    media="(min-width: 1024px)"
    srcset="/imgs/optimized/logo-transparent-top/logo-transparent-top-1024.webp"
    type="image/webp"
  />

  <!-- Tablet 640+ -->
  <source 
    media="(min-width: 640px)"
    srcset="/imgs/optimized/logo-transparent-top/logo-transparent-top-640.webp"
    type="image/webp"
  />

  <!-- Mobile 320+ -->
  <source 
    media="(min-width: 320px)"
    srcset="/imgs/optimized/logo-transparent-top/logo-transparent-top-320.webp"
    type="image/webp"
  />

  <!-- Fallback (default) -->
  <img 
    src="/imgs/optimized/logo-transparent-top/logo-transparent-top.webp"
    alt="Logo Box Club Orlová"
    class="logo"
    width="400"
    height="400"
    loading="lazy"
    decoding="async"
  />
      </picture>
      <h1>Boxing Club Orlová</h1>
      <p class="subtitle">
        Nemusíš být nejlepší. Stačí být lepší než včera.
      </p>

      <v-row justify="center" class="mb-4">
        <v-col cols="6" class="d-flex justify-end">
          <v-btn
        color="white"
        variant="outlined"
        class="cta"
        size="large"
        to="/contact"
      >
        Zeptej se
      </v-btn>
        </v-col>

        <v-col cols="6" class="d-flex justify-start">
        <v-btn
        color="white"
        variant="outlined"
        class="cta"
        size="large"
        to="/trainings"
      >
        Koukni Rozpis
      </v-btn>
        </v-col>
      </v-row>
    </div>

  </section>
</template>

<style scoped lang="scss">
.hero-video-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* FIX FOR VERTICAL VIDEO (INSTAGRAM REELS) */
.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100vh;
  transform: translate(-50%, -50%);
  object-fit: cover;
  object-position: center top;
  z-index: 1;

  /* Extra stretch for vertical videos */
  /* (násobne lepšie využíva priestor pri Reels videách) */
  @media (min-aspect-ratio: 4/3) {
    transform: translate(-50%, -50%) scale(1.25);
  }
}

/* DARK-RED OVERLAY (FURY-RED SHADE) */
.overlay {
  position: absolute;
  inset: 0;
  //background-image: url("/imgs/optimized/bg-red/bg-red-webp.webp");
  background: rgba(49, 41, 41, 0.829); /* priesvitná fury-red */
  z-index: 2;
  height: 100%;
}

/* Content */
.content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  padding: 0 1rem;

  h1 {
    font-size: 3rem;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }

  .cta {
    font-weight: 700;
    border-width: 2px;
  }
  .cta:hover {
    background-color: $snow-white;
    *{
      color: $fury-red;
    }
  }
}

/* Mobile */
@media (max-width: 640px) {
  .content h1 {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1rem;
  }
}


</style>
