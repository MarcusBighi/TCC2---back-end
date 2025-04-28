import express from 'express';
const router = express.Router();

// Só para teste inicial
router.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

export default router;