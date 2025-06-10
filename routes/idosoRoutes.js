import express from 'express';
import { criarIdoso, atualizarIdoso } from '../controllers/idosoController.js';
import Idoso from '../models/Idoso.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload, criarIdoso);

// Buscar todos os idosos
router.get('/', async (req, res) => {
  try {
    const idosos = await Idoso.find();
    res.json(idosos);
  } catch (error) {
    console.error('Erro ao buscar idosos:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const idoso = await Idoso.findById(req.params.id);
    if (!idoso) return res.status(404).json({ message: 'Idoso não encontrado' });
    res.json(idoso);
  } catch (error) {
    console.error("Erro ao buscar idoso:", error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

  router.put('/:id', atualizarIdoso);

export default router;