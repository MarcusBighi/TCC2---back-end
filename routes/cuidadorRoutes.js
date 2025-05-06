import express from 'express';
import { criarCuidador, atualizarCuidador } from '../controllers/cuidadorController.js';
import Cuidador from '../models/Cuidador.js';

const router = express.Router();

// ✅ Rota de criação
router.post('/', criarCuidador);

// ✅ Rota de leitura de 1 cuidador
router.get('/:id', async (req, res) => {
    try {
      const cuidador = await Cuidador.findById(req.params.id);
      if (!cuidador) return res.status(404).json({ message: 'Cuidador não encontrado' });
      res.json(cuidador);
    } catch (error) {
      console.error("Erro ao buscar cuidador:", error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
});

// ✅ NOVO: rota de leitura de todos os cuidadores
router.get('/', async (req, res) => {
    try {
      const cuidadores = await Cuidador.find();
      res.json(cuidadores);
    } catch (error) {
      console.error("Erro ao buscar cuidadores:", error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
});

// ✅ Rota de atualização
router.put('/:id', atualizarCuidador);

export default router;

