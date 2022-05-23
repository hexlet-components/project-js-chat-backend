// @ts-check

// import Pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';
// import pointOfView from 'point-of-view';
import fastifySocketIo from 'fastify-socket.io';
// import fastifyStatic from 'fastify-static';
import fastifyJWT from 'fastify-jwt';
import HttpErrors from 'http-errors';

import addRoutes from './routes.js';

const { Unauthorized } = HttpErrors;

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

const setUpAuth = (app) => {
  // TODO add socket auth
  app
    .register(fastifyJWT, {
      secret: 'supersecret',
    })
    .decorate('authenticate', async (req, reply) => {
      try {
        await req.jwtVerify();
      } catch (_err) {
        reply.send(new Unauthorized());
      }
    });
};

export default async (app, options) => {
  setUpAuth(app);
  // setUpViews(app);
  // setUpStaticAssets(app);
  await app.register(fastifySocketIo);
  addRoutes(app, options?.state || {});

  return app;
};
