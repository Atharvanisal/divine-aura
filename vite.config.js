import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import appointmentHandler from './api/appointment.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      {
        name: 'api-serverless-dev',
        configureServer(server) {
          server.middlewares.use('/api/appointment', async (req, res) => {
            // Read server environment variables from .env / .env.local for local testing
            const env = loadEnv(server.config.mode || mode || 'development', process.cwd(), '');
            if (env.RESEND_API_KEY) {
              process.env.RESEND_API_KEY = env.RESEND_API_KEY;
            }
            if (env.DIVINE_AURA_FROM_EMAIL) {
              process.env.DIVINE_AURA_FROM_EMAIL = env.DIVINE_AURA_FROM_EMAIL;
            }
            if (env.DIVINE_AURA_TO_EMAIL) {
              process.env.DIVINE_AURA_TO_EMAIL = env.DIVINE_AURA_TO_EMAIL;
            }

            await appointmentHandler(req, res);
          });
        },
      },
    ],
    server: {
      port: 5173,
      open: false,
    },
  }
})
