import * as nginx from '../nginx/index.js';

// test
export const test = async (req, res) => {
  let data = await nginx.test();

  return res.status(200).json({
    data
  });
}

// dump
export const dump = async (req, res) => {
  let data = await nginx.dump();

  return res.status(200).json({
    data
  });
}

// reload
export const reload = async (req, res) => {
  let data = await nginx.reload();

  return res.status(200).json({
    data
  });
}

// stop
export const stop = async (req, res) => {
  let data = await nginx.stop();

  return res.status(200).json({
    data
  });
}

// list
export const list = async (req, res) => {
  let { success, message } = await nginx.list();

  if (!success) {
    return res.status(400).json({
      message: message
    });
  }

  return res.status(200).json({
    data: message
  });
}

// create
export const create = async (req, res) => {
  if (typeof req.body !== 'object' || typeof req.body.name !== 'string' || typeof req.body.content !== 'string') {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  const name = req.body.name;
  const content = req.body.content;

  // name
  if (name.trim() === '' || name.includes('/') || name.includes('\\') || name.includes('..')) {
    return res.status(400).json({ message: 'Invalid data received' });
  }
  // content
  if (content.trim() === '') {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  let { success, message } = await nginx.create(name, content);

  if (!success) {
    return res.status(400).json({
      message: message
    });
  }

  return res.status(200).json({
    message: message
  });
}

// remove
export const remove = async (req, res) => {
  if (typeof req.body !== 'object' || typeof req.body.name !== 'string') {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  const name = req.body.name;

  // name
  if (name.trim() === '' || name.includes('/') || name.includes('\\') || name.includes('..')) {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  let { success, message } = await nginx.remove(name);

  if (!success) {
    return res.status(400).json({
      message: message
    });
  }

  return res.status(200).json({
    message: message
  });
}

// read
export const read = async (req, res) => {
  if (typeof req.params !== 'object' || typeof req.params.name !== 'string') {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  const name = req.params.name;

  // name
  if (name.trim() === '' || name.includes('/') || name.includes('\\') || name.includes('..')) {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  let { success, message } = await nginx.read(name);

  if (!success) {
    return res.status(400).json({
      message: message
    });
  }

  return res.status(200).json({
    data: message
  });
}

// update
export const update = async (req, res) => {
  if (typeof req.body !== 'object' || typeof req.body.name !== 'string' || typeof req.body.content !== 'string') {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  const name = req.body.name;
  const content = req.body.content;

  // name
  if (name.trim() === '' || name.includes('/') || name.includes('\\') || name.includes('..')) {
    return res.status(400).json({ message: 'Invalid data received' });
  }
  // content
  if (content.trim() === '') {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  let { success, message } = await nginx.update(name, content);

  if (!success) {
    return res.status(400).json({
      message: message
    });
  }

  return res.status(200).json({
    message: message
  });
}

// toggle
export const toggle = async (req, res) => {
  if (typeof req.body !== 'object' || typeof req.body.name !== 'string') {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  const name = req.body.name;

  // name
  if (name.trim() === '' || name.includes('/') || name.includes('\\') || name.includes('..')) {
    return res.status(400).json({ message: 'Invalid data received' });
  }

  let { success, message } = await nginx.toggle(name);

  if (!success) {
    return res.status(400).json({
      message: message
    });
  }

  return res.status(200).json({
    message: message
  });
}
