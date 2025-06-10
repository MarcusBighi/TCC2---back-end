
import multer from 'multer';
import path from 'path';

// Configuração do destino e nome do arquivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Certifique-se de que a pasta existe
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Campos permitidos: fotoPerfil (1), anexos (até 10)
const upload = multer({ storage }).fields([
  { name: 'fotoPerfil', maxCount: 1 },
  { name: 'anexos', maxCount: 10 }
]);

export default upload;
