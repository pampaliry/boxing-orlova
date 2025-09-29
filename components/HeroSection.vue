<template>
  <v-card class="pa-8" elevation="10" aria-label="Úvodný popis projektu">

    <!-- HlAVNY-NADPIS SEKCIA -->
    <v-card-title class="text-center d-flex justify-center align-center flex-wrap">
      <span class="d-inline-flex align-center">
        <HandWave style="font-size: 1.5rem; margin-right: 0.5rem;" />
        <h1 class="main-heading" aria-label="Hlavný nadpis stránky">Vitaj na mm-smart.eu</h1>
      </span>
    </v-card-title>

    <!-- MAIN-ARTICLE SEKCIA -->
    <MainArticle />

    <!-- CTA TLAČIDLÁ -->
    <CallToAction />

  </v-card>
</template>