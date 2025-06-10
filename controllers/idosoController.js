import Idoso from '../models/Idoso.js';
import bcrypt from 'bcryptjs';
import path from 'path';

export const criarIdoso = async (req, res) => {
  try {
    const {
      nome, endereco, idade, telefone, telefoneEmergencia,
      nomeContato, enderecoResponsavel, email, senha,
      desafios, observacoes
    } = req.body;

    const existente = await Idoso.findOne({ email });
    if (existente) return res.status(400).json({ message: 'E-mail já cadastrado.' });

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // 📷 Foto de perfil
    const fotoPerfil = req.files['fotoPerfil']?.[0]?.filename || null;

    // 📎 Anexos
    const anexos = req.files['anexos']
      ? req.files['anexos'].map(file => file.filename)
      : [];

    const novoIdoso = new Idoso({
      nome,
      endereco,
      idade,
      telefone,
      telefoneEmergencia,
      nomeContato,
      enderecoResponsavel,
      email,
      senha: senhaCriptografada,
      desafios,
      observacoes,
      fotoPerfil,
      anexos,
    });

    await novoIdoso.save();
    res.status(201).json({ message: 'Idoso cadastrado com sucesso!', idoso: novoIdoso });
  } catch (error) {
    console.error("Erro no cadastro do idoso:", error);
    res.status(500).json({ message: 'Erro ao cadastrar idoso', error });
  }
};

export const atualizarIdoso = async (req, res) => {
  try {
    const idoso = await Idoso.findById(req.params.id);
    if (!idoso) return res.status(404).json({ message: 'Idoso não encontrado' });

    // Atualizar senha
    if (req.body.senha) {
      req.body.senha = await bcrypt.hash(req.body.senha, 10);
    }

    const atualizado = await Idoso.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(atualizado);
  } catch (error) {
    console.error("Erro ao atualizar idoso:", error);
    res.status(500).json({ message: 'Erro ao atualizar idoso', error });
  }
};
