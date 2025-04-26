import express from 'express';

import { health, ping } from '../controllers/index.js'

const router = express.Router();

router.get('/health', health);
router.get('/ping', ping);

export default router;
