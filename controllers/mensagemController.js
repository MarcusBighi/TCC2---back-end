import Mensagem from '../models/Mensagem.js';

// Enviar nova mensagem
export const enviarMensagem = async (req, res) => {
  console.log("📥 req.body recebido:", req.body);
  
  try {
    const { remetenteId, destinatarioId, conteudo, tipo, anexo } = req.body;

    const novaMensagem = new Mensagem({ remetenteId, destinatarioId, conteudo, tipo, anexo });
    await novaMensagem.save();

    res.status(201).json(novaMensagem);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ message: 'Erro ao enviar mensagem' });
  }
};

// Buscar mensagens entre dois usuários
export const listarMensagens = async (req, res) => {
  const { usuario1, usuario2 } = req.params;

  try {
    const mensagens = await Mensagem.find({
      $or: [
        { remetenteId: usuario1, destinatarioId: usuario2 },
        { remetenteId: usuario2, destinatarioId: usuario1 },
      ],
    }).sort({ dataEnvio: 1 });

    res.json(mensagens);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ message: 'Erro ao buscar mensagens' });
  }
};
