import Mensagem from '../models/Mensagem.js';
import Cuidador from '../models/Cuidador.js';
import Idoso from '../models/Idoso.js';

// ✅ Enviar nova mensagem
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

// ✅ Buscar mensagens entre dois usuários
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

// ✅ Listar histórico de conversas (últimas interações)
export const listarHistoricoConversas = async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    const mensagens = await Mensagem.find({
      $or: [
        { remetenteId: idUsuario },
        { destinatarioId: idUsuario }
      ]
    }).sort({ dataEnvio: -1 });

    const conversasMap = {};

    for (const msg of mensagens) {
      const outroId = msg.remetenteId.toString() === idUsuario
        ? msg.destinatarioId.toString()
        : msg.remetenteId.toString();

      if (!conversasMap[outroId]) {
        // Buscar nome e foto do outro usuário
        let outroUsuario = await Cuidador.findById(outroId).lean();
        if (!outroUsuario) {
          outroUsuario = await Idoso.findById(outroId).lean();
        }

        conversasMap[outroId] = {
          outroUsuarioId: outroId,
          nomeOutroUsuario: outroUsuario?.nome || 'Usuário',
          fotoOutroUsuario: outroUsuario?.foto || 'https://via.placeholder.com/150',
          conteudo: msg.conteudo,
          tipo: msg.tipo,
          anexo: msg.anexo,
          dataEnvio: msg.dataEnvio
        };
      }
    }

    res.status(200).json(Object.values(conversasMap));
  } catch (error) {
    console.error('Erro ao listar histórico:', error);
    res.status(500).json({ message: 'Erro ao buscar histórico de conversas' });
  }
};
