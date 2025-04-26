import express from 'express';

import api from './api.js';
import nginx from './nginx.js';

const router = express.Router();

router.use('/api', api);
router.use('/nginx', nginx);

export default router;
