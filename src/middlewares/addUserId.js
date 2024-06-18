export const addUserId = () => async (req, res, next) => {
  req.body.userId = req.user._id;
  next();
};
