declare const _default: () => {
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    firebase: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };
    encryption: {
        secretKey: string;
        secretIv: string;
        encryptionMethod: string;
    };
    mail: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    };
    nodeEnv: string;
    mongoDb: string;
};
export default _default;
export declare const PORT = "port";
export declare const JWT_SECRET = "jwt.secret";
export declare const JWT_EXPIRES_IN = "jwt.expiresIn";
export declare const DATABASE_HOST = "database.host";
export declare const DATABASE_PORT = "database.port";
export declare const DATABASE_USERNAME = "database.username";
export declare const DATABASE_PASSWORD = "database.password";
export declare const DATABASE_NAME = "database.name";
export declare const FIREBASE_API_KEY = "firebase.apiKey";
export declare const FIREBASE_AUTH_DOMAIN = "firebase.authDomain";
export declare const FIREBASE_PROJECT_ID = "firebase.projectId";
export declare const FIREBASE_STORAGE_BUCKET = "firebase.storageBucket";
export declare const FIREBASE_MESSAGING_SENDER_ID = "firebase.messagingSenderId";
export declare const FIREBASE_APP_ID = "firebase.appId";
export declare const FIREBASE_MEASUREMENT_ID = "firebase.measurementId";
export declare const SECRET_KEY = "encryption.secretKey";
export declare const SECRET_IV = "encryption.secretIv";
export declare const ENCRYPTION_METHOD = "encryption.encryptionMethod";
export declare const MAIL_HOST = "mail.host";
export declare const MAIL_PORT = "mail.port";
export declare const MAIL_SECURE = "mail.secure";
export declare const MAIL_USER = "mail.auth.user";
export declare const MAIL_PASS = "mail.auth.pass";
export declare const NODE_ENV = "nodeEnv";
export declare const MONGODB_URI = "mongoDb";
