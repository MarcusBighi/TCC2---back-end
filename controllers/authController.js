import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cuidador from '../models/Cuidador.js';
import Idoso from '../models/Idoso.js';

export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Tentar encontrar o usuário primeiro como Cuidador
    let usuario = await Cuidador.findOne({ email });
    let tipoUsuario = 'cuidador';

    // Se não achou como cuidador, tenta como Idoso
    if (!usuario) {
      usuario = await Idoso.findOne({ email });
      tipoUsuario = 'idoso';
    }

    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ message: 'Senha incorreta.' });

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, tipo: tipoUsuario },
      process.env.JWT_SECRET || 'segredo',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      tipo: tipoUsuario,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: 'Erro no servidor', error });
  }
};
