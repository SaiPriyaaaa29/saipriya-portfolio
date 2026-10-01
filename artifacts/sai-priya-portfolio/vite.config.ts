import { createReadStream, readFileSync, statSync } from 'node:fs';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

const resumeFileName = 'SaiPriya_Resume_1790887187001.pdf';
const resumeFilePath = path.resolve(
  import.meta.dirname,
  '..',
  '..',
  'attached_assets',
  resumeFileName,
);
const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
const resumeUrlPath = `${normalizedBasePath}resume.pdf`;
const resumeFileSize = statSync(resumeFilePath).size;

function resumeDownloadPlugin(): Plugin {
  return {
    name: 'portfolio-resume-download',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== resumeUrlPath) {
          return next();
        }

        if (req.method !== 'GET' && req.method !== 'HEAD') {
          res.statusCode = 405;
          res.setHeader('Allow', 'GET, HEAD');
          return res.end();
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', String(resumeFileSize));
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${resumeFileName}"`,
        );
        res.setHeader('X-Content-Type-Options', 'nosniff');

        if (req.method === 'HEAD') {
          return res.end();
        }

        createReadStream(resumeFilePath).on('error', next).pipe(res);
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'resume.pdf',
        source: readFileSync(resumeFilePath),
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    resumeDownloadPlugin(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
