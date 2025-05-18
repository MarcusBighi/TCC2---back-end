import express from 'express';
import { enviarMensagem, listarMensagens } from '../controllers/mensagemController.js';

const router = express.Router();

router.post('/', enviarMensagem);
router.get('/:usuario1/:usuario2', listarMensagens);

export default router;