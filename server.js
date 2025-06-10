import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import cuidadorRoutes from './routes/cuidadorRoutes.js';
import idosoRoutes from './routes/idosoRoutes.js';
import mensagensRoutes from './routes/mensagensRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ✅ Criação automática da pasta de uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ✅ Middlewares globais
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir)); // Servir arquivos públicos

// ✅ Rotas
app.use('/api/auth', authRoutes);
app.use('/api/cuidadores', cuidadorRoutes);
app.use('/api/idosos', idosoRoutes);
app.use('/api/mensagens', mensagensRoutes);

// ⚠️ Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

// ✅ Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
