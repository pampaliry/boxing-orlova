// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    // components,
    // directives,
    theme: {
      defaultTheme: 'dark',
      themes: {
        light: {
          colors: {
            background: '#f5f5f5',
            surface: '#ffffff',
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
