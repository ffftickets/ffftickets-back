"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_S3_BUCKET_REGION = exports.AWS_S3_BUCKET_NAME = exports.AWS_SECRET_ACCESS_KEY = exports.AMAZON_S3_ACCESS_KEY_ID = exports.MONGODB_URI = exports.NODE_ENV = exports.MAIL_PASS = exports.MAIL_USER = exports.MAIL_SECURE = exports.MAIL_PORT = exports.MAIL_HOST = exports.ENCRYPTION_METHOD = exports.SECRET_IV = exports.SECRET_KEY = exports.FIREBASE_MEASUREMENT_ID = exports.FIREBASE_APP_ID = exports.FIREBASE_MESSAGING_SENDER_ID = exports.FIREBASE_STORAGE_BUCKET = exports.FIREBASE_PROJECT_ID = exports.FIREBASE_AUTH_DOMAIN = exports.FIREBASE_API_KEY = exports.DATABASE_NAME = exports.DATABASE_PASSWORD = exports.DATABASE_USERNAME = exports.DATABASE_PORT = exports.DATABASE_HOST = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.PORT = void 0;
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    jwt: {
        secret: process.env.JWT_SECRET || '',
        expiresIn: process.env.JWT_EXPIRES_IN || '',
    },
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT) || 3306,
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
    encryption: {
        secretKey: process.env.SECRET_KEY || '',
        secretIv: process.env.SECRET_IV || '',
        encryptionMethod: process.env.ENCRYPTION_METHOD || '',
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 10) || 587,
        secure: process.env.MAIL_SECURE === 'true',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    },
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoDb: process.env.MONGODB_URI || '',
    amazon3s: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        bucketName: process.env.AWS_S3_BUCKET_NAME || '',
        bucketRegion: process.env.AWS_S3_BUCKET_REGION || '',
    }
});
exports.PORT = 'port';
exports.JWT_SECRET = 'jwt.secret';
exports.JWT_EXPIRES_IN = 'jwt.expiresIn';
exports.DATABASE_HOST = 'database.host';
exports.DATABASE_PORT = 'database.port';
exports.DATABASE_USERNAME = 'database.username';
exports.DATABASE_PASSWORD = 'database.password';
exports.DATABASE_NAME = 'database.name';
exports.FIREBASE_API_KEY = 'firebase.apiKey';
exports.FIREBASE_AUTH_DOMAIN = 'firebase.authDomain';
exports.FIREBASE_PROJECT_ID = 'firebase.projectId';
exports.FIREBASE_STORAGE_BUCKET = 'firebase.storageBucket';
exports.FIREBASE_MESSAGING_SENDER_ID = 'firebase.messagingSenderId';
exports.FIREBASE_APP_ID = 'firebase.appId';
exports.FIREBASE_MEASUREMENT_ID = 'firebase.measurementId';
exports.SECRET_KEY = 'encryption.secretKey';
exports.SECRET_IV = 'encryption.secretIv';
exports.ENCRYPTION_METHOD = 'encryption.encryptionMethod';
exports.MAIL_HOST = 'mail.host';
exports.MAIL_PORT = 'mail.port';
exports.MAIL_SECURE = 'mail.secure';
exports.MAIL_USER = 'mail.auth.user';
exports.MAIL_PASS = 'mail.auth.pass';
exports.NODE_ENV = 'nodeEnv';
exports.MONGODB_URI = 'mongoDb';
exports.AMAZON_S3_ACCESS_KEY_ID = 'amazon3s.accessKeyId';
exports.AWS_SECRET_ACCESS_KEY = 'amazon3s.secretAccessKey';
exports.AWS_S3_BUCKET_NAME = 'amazon3s.bucketName';
exports.AWS_S3_BUCKET_REGION = 'amazon3s.bucketRegion';
//# sourceMappingURL=config.env.js.map