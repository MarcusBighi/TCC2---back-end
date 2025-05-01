import Cuidador from '../models/Cuidador.js';
import bcrypt from 'bcryptjs';

export const criarCuidador = async (req, res) => {
  try {
    const {
      nome, cpf, idade, endereco, formacao, especialidade,
      telefone, email, senha, experiencias, metodos,
      disponibilidade, fotoPerfil, anexos
    } = req.body;

    // Verifica se email já existe
    const existente = await Cuidador.findOne({ email });
    if (existente) return res.status(400).json({ message: 'E-mail já cadastrado.' });

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoCuidador = new Cuidador({
      nome, cpf, idade, endereco, formacao, especialidade,
      telefone, email,
      senha: senhaCriptografada,
      experiencias, metodos,
      disponibilidade, fotoPerfil, anexos
    });

    await novoCuidador.save();
    res.status(201).json({ message: 'Cuidador cadastrado com sucesso!' });

  } catch (error) {
    console.error("Erro no cadastro do cuidador:", error);
    res.status(500).json({ message: 'Erro ao cadastrar cuidador', error });
  }
};

export const atualizarCuidador = async (req, res) => {
  try {
    const cuidador = await Cuidador.findById(req.params.id);
    if (!cuidador) return res.status(404).json({ message: 'Cuidador não encontrado' });

    // opcional: se quiser atualizar senha
    if (req.body.senha) {
      req.body.senha = await bcrypt.hash(req.body.senha, 10);
    }

    const atualizado = await Cuidador.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(atualizado);
  } catch (error) {
    console.error("Erro ao atualizar cuidador:", error);
    res.status(500).json({ message: 'Erro ao atualizar cuidador', error });
  }
};

