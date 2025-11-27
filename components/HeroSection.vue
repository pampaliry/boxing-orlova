<script setup>
import { useVideos } from '~/composables/useVideos'

const { videos } = useVideos()
</script>

<template>
 <section>
  <v-container class="py-16 hero" fluid>
          <v-row justify="center">
            <v-col cols="10" lg="8" class="">
                <h1>Bojové sporty pro děti, mládež i dospělé</h1>        
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col cols="10" >
              <div class="placeholder"></div>
                <picture >
  <!-- Desktop 1024+ -->
                <source 
                  media="(min-width: 1024px)"
                  srcset="/imgs/optimized/orol-transparent-bg/orol-transparent-bg-1024.webp"
                  type="image/webp"
                />

                <!-- Tablet 640+ -->
                <source 
                  media="(min-width: 640px)"
                  srcset="/imgs/optimized/orol-transparent-bg/orol-transparent-bg-640.webp"
                  type="image/webp"
                />

                <!-- Mobile 320+ -->
                <source 
                  media="(min-width: 320px)"
                  srcset="/imgs/optimized/orol-transparent-bg/orol-transparent-bg-320.webp"
                  type="image/webp"
                />

                <!-- Fallback (default) -->
                <img 
                  src="/imgs/optimized/orol-transparent-bg/orol-transparent-bg.webp"
                  alt="mascot"
                  class="mascot-image"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
                </picture>
            </v-col>
          </v-row>
        <v-row justify="center" class="">
          <v-col cols="10" class="text-center">
            <h2>Podívejte se na naše tréninky v akci</h2>
             <VideoPlayer :videos="videos" />
          </v-col>
        </v-row>
         
        </v-container>       
 </section>
</template>


<style scoped lang="scss">
.hero {
  background-color: $fury-red;
  background-image: url("/imgs/optimized/bg-red/bg-red.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  .mascot-image {
    display: flex;
    justify-content: end;
    align-items: end;
   // margin: 2rem auto 0 auto;
    max-width: 100%;
    height: auto;
   // border-bottom: $ash-gray 2px solid;
  }
  .placeholder {
    display: block;
    height: 8vh;
  }
}
</style>