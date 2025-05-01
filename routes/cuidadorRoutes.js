import express from 'express';
import { criarCuidador, atualizarCuidador } from '../controllers/cuidadorController.js';
import Cuidador from '../models/Cuidador.js';

const router = express.Router();

router.post('/', criarCuidador);

router.get('/:id', async (req, res) => {
    try {
      const cuidador = await Cuidador.findById(req.params.id);
      if (!cuidador) return res.status(404).json({ message: 'Cuidador não encontrado' });
      res.json(cuidador);
    } catch (error) {
      console.error("Erro ao buscar cuidador:", error);
      res.status(500).json({ message: 'Erro no servidor' });
    }

    router.put('/:id', atualizarCuidador);
    
  });

export default router;
