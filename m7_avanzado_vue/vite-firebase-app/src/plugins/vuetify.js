import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customLight',
    dark: false,
    colors: {
      primary: '#1F2933', // navbar oscuro
      secondary: '#323F4B',
      background: '#e1e4e7', // fondo gris suave
      surface: '#FFFFFF',
      success: '#2E7D32',
      error: '#C62828',
      warning: '#eded30'
    }
  }
});