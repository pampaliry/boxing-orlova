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
                    class="mx-1 text-secondary" :aria-label="`Navigácia na stránku ${link.name}`">
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
    v-model="drawer" app temporary class="d-sm-none" width="220" role="navigation"
      aria-label="Mobilné menu">
      <v-list nav dense>
        <v-list-item 
        v-for="link in navLinks" :key="link.path" :to="link.path"
          :aria-label="`Navigácia na stránku ${link.name}`" link @click="drawer = false">
          <v-list-item-title>{{ link.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- MAIN CONTENT -->
    <v-main role="main">
      <v-container class="py-16" fluid>
        <v-row justify="center">
          <v-col cols="12" sm="10" lg="8">
            <NuxtPage />
          </v-col>
        </v-row>
      </v-container>
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

const drawer = ref(false)

const navLinks = [
  { name: 'Domov', path: '/' },
  { name: 'Projekty', path: '/projects' },
  { name: 'Kontakt', path: '/contact' },
]
</script>
