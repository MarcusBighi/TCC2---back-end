import Idoso from '../models/Idoso.js';
import bcrypt from 'bcryptjs';

export const criarIdoso = async (req, res) => {
  try {
    const {
      nome, endereco, idade, telefone, telefoneEmergencia,
      nomeContato, enderecoResponsavel, email, senha,
      desafios, observacoes, fotoPerfil, anexos
    } = req.body;

    // Verifica se já existe e-mail
    const existente = await Idoso.findOne({ email });
    if (existente) return res.status(400).json({ message: 'E-mail já cadastrado.' });

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoIdoso = new Idoso({
      nome, endereco, idade, telefone, telefoneEmergencia,
      nomeContato, enderecoResponsavel, email,
      senha: senhaCriptografada,
      desafios, observacoes, fotoPerfil, anexos
    });

    await novoIdoso.save();
    res.status(201).json({ message: 'Idoso cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar idoso', error });
  }
};
