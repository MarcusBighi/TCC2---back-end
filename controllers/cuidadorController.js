import Cuidador from '../models/Cuidador.js';
import bcrypt from 'bcryptjs';

export const criarCuidador = async (req, res) => {
  try {
    const {
      nome, cpf, idade, endereco, formacao,
      especialidade, telefone, email, senha,
      experiencias, metodos, fotoPerfil, anexos
    } = req.body;

    const existente = await Cuidador.findOne({ email });
    if (existente) return res.status(400).json({ message: 'E-mail já cadastrado.' });

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoCuidador = new Cuidador({
      nome, cpf, idade, endereco, formacao,
      especialidade, telefone, email,
      senha: senhaCriptografada,
      experiencias, metodos, fotoPerfil, anexos
    });

    await novoCuidador.save();
    res.status(201).json({ message: 'Cuidador cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar cuidador:', error);
    res.status(500).json({ message: 'Erro no cadastro', error });
  }
};
