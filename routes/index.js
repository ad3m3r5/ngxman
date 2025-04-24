import express from 'express';
import {
  get,
  read
} from '../controllers/index.js'

const router = express.Router();

router.get('/get', get);
router.post('/read', read);

export default router;
