import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';

import sessionMiddleware from './middleware/session.js'
import authRoutes from './routes/authRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'

dotenv.config({path: '../../.env'})

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Verbindung
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Successfully connected to MongoDB");
});

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true // Damit Cookies, Autorisierungsheader und TLS-Client-Zertifikate bereitgestellt werden
}));

app.use(express.json()); // Für das Parsen von JSON im body von Anfragen
app.use(sessionMiddleware); // Session-Middleware vor den Routen einfügen

app.use('/api/auth', authRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/expenses', expenseRoutes);


// Einfache Route als Test
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});



// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
