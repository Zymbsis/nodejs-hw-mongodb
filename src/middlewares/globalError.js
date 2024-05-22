export const globalError = (err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
