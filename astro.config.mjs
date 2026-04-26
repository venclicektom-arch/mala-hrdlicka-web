import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

export default defineConfig({
  // --- ZMĚNĚNO Z HYBRID NA STATIC ---
  output: 'static',
  adapter: netlify(),
  // ----------------------------------

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
  ],
});
