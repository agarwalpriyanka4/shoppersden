import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),{
    "@tailwindcss/postcss": {},
  }],
  server:{
    proxy:{
      '/postman-echo':{
        target:"https://postman-echo.com",
        changeOrigin:true,
        secure:false,
        rewrite:(path)=>path.replace(/^\/postman-echo/,'/postman-echo')
      }
    }
  },
  build:{
    rollupOptions:"home.html"
  },
  test:{
    environment:"jsdom",
    setupFiles:["./src/setupTests.js"],
    clearMocks:true,
    restoreMocks:true,
    mockReset:true,
     coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"], //
      reportsDirectory: "./coverage",
    },
  }
  
})
