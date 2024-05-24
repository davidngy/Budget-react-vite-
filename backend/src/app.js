import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';

import sessionMiddleware from './middleware/session.js'
import authRoutes from './routes/authRoutes.js';

dotenv.config({path: '../../.env'})

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(cors());
app.use(express.json()); // Für das Parsen von JSON im body von Anfragen
app.use('/api/auth', authRoutes)
app.use(sessionMiddleware);

// Einfache Route als Test
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// MongoDB Verbindung
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Successfully connected to MongoDB");
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
