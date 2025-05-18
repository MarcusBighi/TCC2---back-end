import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import cuidadorRoutes from './routes/cuidadorRoutes.js';
import idosoRoutes from './routes/idosoRoutes.js';
import mensagensRoutes from './routes/mensagensRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware global - só uma vez
app.use(cors());
app.use(express.json());

// ✅ Servir arquivos
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ✅ Rotas
app.use('/api/auth', authRoutes);
app.use('/api/cuidadores', cuidadorRoutes);
app.use('/api/idosos', idosoRoutes);
app.use('/api/mensagens', mensagensRoutes); // ⬅ agora funciona corretamente

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
