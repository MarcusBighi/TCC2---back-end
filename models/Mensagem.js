import mongoose from 'mongoose';

const mensagemSchema = new mongoose.Schema({
  remetenteId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pessoa' },
  destinatarioId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pessoa' },
  conteudo: { type: String },
  tipo: { type: String, enum: ['texto', 'imagem', 'video', 'pdf'], default: 'texto' },
  anexo: { type: String }, // nome do arquivo (se houver)
  dataEnvio: { type: Date, default: Date.now }
});

export default mongoose.model('Mensagem', mensagemSchema, 'mensagens');
