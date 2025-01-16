import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)), 
      '@components-projects': fileURLToPath(new URL('./src/components/projects', import.meta.url)), 
      '@components-tasks': fileURLToPath(new URL('./src/components/tasks', import.meta.url)), 
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)), 
      '@views-projects': fileURLToPath(new URL('./src/views/projects', import.meta.url)),
      '@views-tasks': fileURLToPath(new URL('./src/views/tasks', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)), 
      '@schemas': fileURLToPath(new URL('./src/schemas', import.meta.url)), 
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)), 
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)), 
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@locales': fileURLToPath(new URL('./src/locales', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
    }
  }
})
