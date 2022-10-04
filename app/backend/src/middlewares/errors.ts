import { ErrorRequestHandler } from 'express';
import { getStatusCode } from 'http-status-codes';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  const statusCode = getStatusCode(name);

  res.status(statusCode).json({ message });
};

export default errorMiddleware;
