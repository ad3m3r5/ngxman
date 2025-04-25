import express from 'express';

import { root, ping } from '../controllers/index.js'

const router = express.Router();

router.get('/', root);
router.get('/ping', ping);

export default router;
