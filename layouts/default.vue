<template>
  <v-app>
    <!-- NAVIGATION -->
    <v-app-bar flat app role="navigation" aria-label="Hlavná navigácia">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="10" lg="8">
            <v-row d-flex justify="space-between" no-gutters>
              <!-- LEFT SIDE (burger on mobile, logo on desktop) -->
              <v-col cols="auto" class="d-flex align-center">
                <!-- Burger iba na mobile -->
                <v-app-bar-nav-icon class="d-sm-none" aria-label="Zobraziť navigačné menu" @click="drawer = !drawer" />

                <!-- Logo na desktop -->
                <v-toolbar-title class="d-none d-sm-flex ml-2">
                  <LogoRotate aria-hidden="true" />
                </v-toolbar-title>
              </v-col>

              <!-- MIDDLE SPACER (tlačí logo doprava na mobile) -->
              <v-spacer class="d-sm-none" />

              <!-- RIGHT SIDE -->
              <v-col class="d-flex justify-end align-center">
                <!-- Desktop menu -->
                <div class="d-none d-sm-flex">
                  <v-btn 
                  v-for="link in navLinks" :key="link.path" :to="link.path" variant="text"
                    class="mx-1 nav-btn" :aria-label="`Navigácia na stránku ${link.name}`"  color="primary">
                    {{ link.name }}
                  </v-btn>
                </div>

                <!-- Mobilné logo na úplnom konci -->
                <v-toolbar-title class="d-sm-none d-flex justify-end">
                  <LogoRotate aria-hidden="true" />
                </v-toolbar-title>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- MOBILE DRAWER -->
    <v-navigation-drawer 
    v-model="drawer" app temporary class="d-sm-none" width="320" role="navigation"
      aria-label="Mobilné menu">
      <v-list nav dense>
        <v-list-item class="my-6"
        v-for="link in navLinks" :key="link.path" :to="link.path"
          :aria-label="`Navigácia na stránku ${link.name}`" link @click="drawer = false">
          <v-list-item-title class="text-center">{{ link.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- MAIN CONTENT -->
    <v-main role="main">
      <NuxtPage />
    </v-main>

    <!-- FOOTER -->
    <v-footer app class="text-center text-secondary" role="contentinfo">
      <v-container>
        <small>&copy; {{ new Date().getFullYear() }} Matus Matko – Všetky práva vyhradené.</small>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//import LogoRotate from '@/components/LogoRotate.vue'

const drawer = ref(false)

const navLinks = [
  { name: 'O nás', path: '/' },
  { name: 'Tréningy', path: '/trainings' },
  { name: 'Kontakt', path: '/contact' },
]
</script>

<style lang="scss">
header,footer{background-color: $snow-white !important;
  background-image: url("/public/imgs/eagle/bg-white.png") !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

span.v-btn__content
{
  font-size: clamp(0.9rem, 0.5vw + 0.7rem, 1.1rem) !important;
  font-weight: 700 !important;
}
.v-list-item-title{
  font-size: clamp(2rem, 2.6vw + 1rem, 3.5rem) !important;
  line-height: normal;
}

nav.v-navigation-drawer--active {
  width: 100% !important;
  //max-width: 100% !important;
   background-image: url("/public/imgs/eagle/bg-white.png") !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}
</style>