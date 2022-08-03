module.exports = {
  configName: 'defaultConfig',
  admin: 'admin1234',
  adminPass: '4321admin',
  isAdminActive: true,
  user: 'user1234',
  userPass: '4321user',
  isUserActive: true,
  logLevels: ['error', 'warn', 'log'],
  requestOptions: {
    defaultIntervalUnit: 'hours',
    defaultIntervalValue: 12,
  },
  serverConfig: {
    port: 3200,
    secondServerPort: 3201,
    hsts: false,
  },
  multipleServer: {
    isMultipleServer: false,
    isMainServer: false,
    secodServerUrl: 'localhost',
  },
  dbConfig: {
    dbHost: '127.0.0.1',
    dbName: '',
    dbUser: 'ticketworld',
    dbPass: 'ticketworld1234',
  },
  jwtConfig: {
    jwtKey: 'Wu1VdQFvDTqfJlkCiZTLBS7Y66VPQpchczX',
    jwtExp: 86400,
  },
};
