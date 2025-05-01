import express from 'express';
import { criarIdoso, atualizarIdoso } from '../controllers/idosoController.js';
import Idoso from '../models/Idoso.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('fotoPerfil'), criarIdoso);

router.post('/', criarIdoso);

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