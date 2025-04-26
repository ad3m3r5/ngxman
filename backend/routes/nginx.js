import express from 'express';

import { test, dump, reload, stop, list,
  create, remove, read, update, toggle
} from '../controllers/index.js'

const router = express.Router();

router.get('/test', test);
router.get('/dump', dump);
router.get('/reload', reload);
router.get('/stop', stop);
router.get('/list', list);
router.put('/create', create);
router.delete('/remove', remove);
router.get('/read/:name', read);
router.patch('/update', update);
router.patch('/toggle', toggle);

export default router;
