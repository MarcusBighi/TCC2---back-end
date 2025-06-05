import express from 'express';
import {
  enviarMensagem,
  listarMensagens,
  listarHistoricoConversas
} from '../controllers/mensagemController.js';

const router = express.Router();

// ✅ Rota para histórico deve vir antes
router.get('/historico/:idUsuario', listarHistoricoConversas);

// ✅ Rota para mensagens entre dois usuários
router.get('/:usuario1/:usuario2', listarMensagens);

// ✅ Rota para envio de mensagem
router.post('/', enviarMensagem);

export default router;