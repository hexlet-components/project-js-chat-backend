#! /usr/bin/env node

import Fastify from 'fastify';
import { program } from 'commander';
import plugin from '../plugin.js';

program
  .version('1.0.0', '-v, --version')
  .usage('start-server [OPTIONS]')
  .option('-a, --address', 'address to listen on (default 0.0.0.0)', '0.0.0.0')
  .option('-p, --port', 'port to listen on (default 5001)', '5001')
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
    preparedServer.log.error(err)
    process.exit(1)
  }
};

start()

// npx fastify start ../plugin.js -l info -P -a 0.0.0.0 -p 5001
