import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import appointmentHandler from './api/appointment.js'
import fs from 'fs'
import path from 'path'

function getLocalEnv() {
  const env = {};
  const files = ['.env', '.env.local'];
  for (const file of files) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)?$/);
        if (match) {
          let val = (match[2] || '').trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          env[match[1]] = val;
        }
      }
    }
  }
  return env;
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      {
        name: 'api-serverless-dev',
        configureServer(server) {
          server.middlewares.use('/api/appointment', async (req, res) => {
            // Read fresh server environment variables from .env / .env.local for local testing
            const env = getLocalEnv();
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
