import * as nginx from '../nginx/index.js';

export const get = async (req, res) => {
  let confs = await nginx.get();

  return res.status(200).json({
    confs
  });
}

export const read = async (req, res) => {
  if (typeof req.body !== 'object' || typeof req.body.name !== 'string') {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  const name = req.body.name;

  if (name.trim() === '' || name.includes('/') || name.includes('\\') || name.includes('..')) {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  let file = await nginx.read(req.body.name);

  return res.send({ file });
}
