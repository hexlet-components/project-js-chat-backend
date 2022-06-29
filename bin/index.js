#! /usr/bin/env node

import Fastify from 'fastify';
import { program } from 'commander';
import plugin from '../plugin.js';

const port = process.env.PORT || 5000;

program
  .version('1.0.0', '-v, --version')
  .usage('start-server [OPTIONS]')
  .option('-a, --address <address>', 'address to listen on (default 0.0.0.0)', '0.0.0.0')
  .option('-p, --port <port>', `port to listen on (default ${port})', '${port}'`)
  .parse(process.argv);

const options = program.opts();

const fastify = Fastify({
  logger: true
});

const start = async () => {
  try {
    const preparedServer = await plugin(fastify);
    await preparedServer.listen(options.port, options.address);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
