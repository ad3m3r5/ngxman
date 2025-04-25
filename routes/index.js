import express from 'express';

import routes from './routes.js';
import nginxRoutes from './nginx.js';

const router = express.Router();

router.use('/', routes);
router.use('/nginx', nginxRoutes);

export default router;
