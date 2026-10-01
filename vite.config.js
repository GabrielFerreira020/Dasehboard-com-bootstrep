import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    minify: 'terser', // Minificação agressiva de JS
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs em produção para segurança e performance
      },
    },
    cssMinify: true, // Ativa a minificação nativa do CSS
    sourcemap: false, // Desativa mapas de código para proteger a lógica do projeto
  },
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.7, 0.8], speed: 4 },
      svgo: {
        plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
      },
    }),
  ],
});
