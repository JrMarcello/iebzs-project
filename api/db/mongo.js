/* eslint no-console:0 */
import mongoose from 'mongoose';
import { logInfo, logError, logWarn } from '../src/common/utils';
import populate from './db-seed';

export default (config) => {
  mongoose.Promise = global.Promise;

  const DB_URI = config.DB_HOST + config.DB_NAME;

  mongoose.createConnection(DB_URI, {
    server: {
      auto_reconnect: true,
    },
    reconnectInterval: 5000,
    reconnectTries: 20,
  });

  mongoose.connection.openUri(DB_URI);

  mongoose.connection.on('open', () => {
    logInfo(`Mongoose connected to ${DB_URI}`);

    populate()
      .then(() => {
        logInfo('Initial SEED created');
      })
      .catch((err) => {
        logError(`Initial SEED error: ${err}`);
        mongoose.disconnect();
      });
  });

  mongoose.connection.on('error', (err) => {
    logError(`Mongoose connection error: ${err}`);
    mongoose.disconnect();
  });

  mongoose.connection.on('disconnected', () => logWarn('Mongoose disconnected'));

  // if the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      // logWarn('Mongoose disconnected through user.app termination');
      process.exit(1);
    });
  });
};
