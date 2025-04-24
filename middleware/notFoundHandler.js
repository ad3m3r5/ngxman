export default function notFoundHandler(req, res, next) {
  let status = 404;
  return res.status(status).json({
    message: 'Not found'
  });
}
