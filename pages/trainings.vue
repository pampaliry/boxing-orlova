<template>

  <v-card class="pa-8" elevation="10" aria-label="Zoznam projektov">
    <v-card-title>
      <h1 class="text-center">
        Moje Projekty
      </h1>
    </v-card-title>

    <v-card-text class="">
      <NuxtLink 
      href="http://www.umy-ma.sk" target="_blank" rel="noopener noreferrer"
        aria-label="Otvoriť projekt umy-ma.sk v novom okne">
        umy-ma.sk
      </NuxtLink>
    </v-card-text>
    <web-socket-bpm />
  </v-card>

</template>
