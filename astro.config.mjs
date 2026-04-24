import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  server: {
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    keystatic({
      // Zkusíme přidat i configFile, aby Keystatic věděl, že ho vidíme
      adminPath: '/admin',
      configFile: './keystatic.config.ts',
    }),
  ],
});
