import mongoose from 'mongoose';

const CuidadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true },
  idade: { type: String, required: true },
  endereco: { type: String, required: true },
  formacao: { type: String, required: true },
  especialidade: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  experiencias: { type: String },
  metodos: { type: String },
  disponibilidade: { type: String },
  fotoPerfil: { type: String },
  anexos: [String],
});

export default mongoose.model('Cuidador', CuidadorSchema);

