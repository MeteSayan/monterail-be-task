import * as config from 'config';

const secret = config.get('jwtConfig.jwtKey') as string;
const expiresIn = config.get('jwtConfig.jwtExp') as string;
export const jwtConstants = {
  secret,
  expiresIn,
};
