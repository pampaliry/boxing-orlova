// Material Design Icons
import '@mdi/font/css/materialdesignicons.css';

// Základné Vuetify štýly
import 'vuetify/styles';

// Core importy
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Nutné pre Nuxt/plugin context
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,

    theme: {
      defaultTheme: 'light',

      themes: {
        light: {
          colors: {
            // základné farby UI
            background: '#ffffff', // Snow White
            surface: '#ffffff', // Snow White
            primary: '#d50000', // Fury Red
            secondary: '#4a4a4a', // Steel Gray
            accent: '#82B1FF',
            error: '#d50000',
            info: '#ff6a00',
            success: '#cccccc',
            warning: '#ff6a00',

            // tvoje custom farby (identita Boxing Orlová)
            furyRed: '#d50000',
            nighBlack: '#111111',
            snowWhite: '#ffffff',
            steelGray: '#4a4a4a',
            ashGray: '#cccccc',
            warmOrange: '#ff6a00',
          },
        },
      },
    },

    // globálny style config
    defaults: {
      global: {
        style: {
          fontFamily: `'Bebas Neue', sans-serif`,
        },
      },
    },
  });

  // nainjektovanie Vuetify do aplikácie
  nuxtApp.vueApp.use(vuetify);
});
