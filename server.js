import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import cuidadorRoutes from './routes/cuidadorRoutes.js';
import idosoRoutes from './routes/idosoRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/cuidadores', cuidadorRoutes);
app.use('/api/idosos', idosoRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
