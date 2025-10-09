import 'zone.js/node';
// Cargar ngExpressEngine dinámicamente para no producir errores cuando
// las dependencias SSR/Universal no estén instaladas (por ejemplo, en
// despliegues estáticos donde no necesitamos Universal).
let ngExpressEngine: any | undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
} catch {
  ngExpressEngine = undefined;
}

import express, { Request, Response } from 'express';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// Intent: este archivo es opcional para despliegue estático.
// Evitar importaciones estáticas que fallan en tiempo de compilación si
// los artefactos de SSR no existen (por ejemplo, en despliegue estático).

let AppServerModule: any | undefined;
try {
  // Requerir en tiempo de ejecución solo si el build de SSR está presente
  // (esto evita errores de type-check cuando ./dist/... no existe).
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const serverMain = require('./dist/viam-web/server/main');
  AppServerModule = serverMain && serverMain.AppServerModule ? serverMain.AppServerModule : undefined;
} catch {
  AppServerModule = undefined;
}

const app = express();
const DIST_FOLDER = join(process.cwd(), 'dist/viam-web');

if (AppServerModule && ngExpressEngine) {
  app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
  app.set('view engine', 'html');
  app.set('views', DIST_FOLDER);
}

// Servir archivos estáticos
app.get('*.*', express.static(DIST_FOLDER, { maxAge: '1y' }));

// Todas las demás rutas son manejadas por Angular SSR si está disponible,
// si no, devolvemos el index estático.
app.get('*', (req: Request, res: Response) => {
  if (AppServerModule) {
    res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  } else {
    res.sendFile(join(DIST_FOLDER, 'index.html'));
  }
});

// Puerto
const PORT = process.env['PORT'] || 4000;

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
