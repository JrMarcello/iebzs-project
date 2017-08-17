import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV;
const file = path.join(__dirname, '../env', `.env.${nodeEnv}`);

// Load env vars
const envConfig = dotenv.parse(fs.readFileSync(file));
Object.keys(envConfig).forEach((key) => {
  if (key) {
    process.env[key] = envConfig[key];
  }
});

export default {
  server: {
    HOSTNAME: process.env.HOSTNAME || 'localhost',
    PORT: process.env.PORT || 8000
  },
  api: {
    API_BASE_PATH: process.env.API_BASE_PATH || '/api/v1'
  },
  auth: {
    jwtSecret: process.env.SECRET_KEY || '#$3cR3t@p1K3y_&',
    jwtSession: { session: false }
  },
  db: {
    DB_HOST: process.env.DB_HOST || 'mongodb://127.0.0.1/',
    DB_NAME: process.env.DB_NAME || 'BD-T01'
  }
};
