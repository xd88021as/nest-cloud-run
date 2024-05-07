import * as fs from 'fs';
import {
  CryptoConfig,
  DatabaseConfig,
  JwtConfig,
} from './interfaces/config.interface';

const getFilepath = (config: string) => `/secrets/${config}/config.json`;
const readSecret = (config: string) => {
  try {
    return JSON.parse(fs.readFileSync(getFilepath(config), 'utf-8'));
  } catch (err) {
    return {};
  }
};

const customEnvs = ['BOODION_ENV'];

const envConfigs = {
  get isDev(): boolean {
    return process.env['NODE' + '_ENV'] !== 'production';
  },
  get isProd(): boolean {
    return process.env['BOODION_ENV'] === 'production';
  },
};

const fileConfigs = {
  get crypto(): CryptoConfig {
    return readSecret('crypto');
  },
  get database(): DatabaseConfig {
    return readSecret('database');
  },
  get jwt(): JwtConfig {
    return readSecret('jwt');
  },
};

export default { ...envConfigs, ...fileConfigs };

export const secrets = {
  envSecrets: customEnvs.map((customEnv) => ({
    env: customEnv,
    secret: customEnv.toLowerCase().replace(/_/g, '-'),
  })),
  fileSecrets: Object.keys(fileConfigs).map((config) => ({
    file: getFilepath(config),
    secret: config,
  })),
};
