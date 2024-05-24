import session from 'express-session';

const sessionConfig = session({
    secret: 'LokoPoko',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
});

export default sessionConfig;
