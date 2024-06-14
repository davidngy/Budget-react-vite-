import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionConfig = session({
    name: 'example.sid',
    secret: 'lokoPoko',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://davidngy2803:Gk50NnRrBUE9IZI1@budgetapp.cbvocvk.mongodb.net/?retryWrites=true&w=majority&appName=BudgetApp'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 7, // 7 Stunden
        httpOnly: true, // Sicherheitseinstellung, um sicherzustellen, dass das Cookie nur über HTTP(S) gesendet wird und nicht über JavaScript zugänglich ist
        secure: false, // Setze auf true, wenn du HTTPS verwendest
        sameSite: 'lax' // Zusätzliche Sicherheitseinstellung, um CSRF-Angriffe zu verhindern
    }
});

export default sessionConfig;
