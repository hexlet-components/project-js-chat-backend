// @ts-check

import fastifySocketIo from 'fastify-socket.io';
import fastifyJWT from 'fastify-jwt';
import HttpErrors from 'http-errors';

import addRoutes from './routes.js';

const { Unauthorized } = HttpErrors;

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
  await app.register(fastifySocketIo);
  addRoutes(app, options?.state || {});

  return app;
};
