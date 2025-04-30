import express from 'express';
import { criarCuidador } from '../controllers/cuidadorController.js';

const router = express.Router();

router.post('/', criarCuidador);

export default router;
