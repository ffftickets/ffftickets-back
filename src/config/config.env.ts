export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '',
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port:  parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || 'test',
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY || '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.FIREBASE_APP_ID || '',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
  },
  
});

export const PORT = 'port';

export const JWT_SECRET = 'jwt.secret';
export const JWT_EXPIRES_IN = 'jwt.expiresIn';
export const DATABASE_HOST = 'database.host';
export const DATABASE_PORT = 'database.port';
export const DATABASE_USERNAME = 'database.username';
export const DATABASE_PASSWORD = 'database.password';
export const DATABASE_NAME = 'database.name';

export const FIREBASE_API_KEY = 'firebase.apiKey';
export const FIREBASE_AUTH_DOMAIN = 'firebase.authDomain';
export const FIREBASE_PROJECT_ID = 'firebase.projectId';
export const FIREBASE_STORAGE_BUCKET = 'firebase.storageBucket';
export const FIREBASE_MESSAGING_SENDER_ID = 'firebase.messagingSenderId';
export const FIREBASE_APP_ID = 'firebase.appId';
export const FIREBASE_MEASUREMENT_ID = 'firebase.measurementId';


