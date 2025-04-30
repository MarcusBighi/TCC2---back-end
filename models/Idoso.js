import mongoose from 'mongoose';

const IdosoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  idade: { type: Number, required: true },
  telefone: { type: String, required: true },
  telefoneEmergencia: { type: String, required: true },
  nomeContato: { type: String, required: true },
  enderecoResponsavel: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  desafios: { type: String },
  observacoes: { type: String },
  fotoPerfil: { type: String },
  anexos: [String], // nomes dos arquivos
}, {
  timestamps: true
});

export default mongoose.model('Idoso', IdosoSchema);
