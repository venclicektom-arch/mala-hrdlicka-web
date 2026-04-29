import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://slapy-hrdlicka.cz',
  output: 'static',

  server: {
    port: 3000,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    keystatic({
      adminPath: '/admin',
      configFile: './keystatic.config.ts',
    }),
    sitemap(),
  ],
});
