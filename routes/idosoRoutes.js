import express from 'express';
import { criarIdoso } from '../controllers/idosoController.js';

const router = express.Router();

router.post('/', criarIdoso);

export default router;