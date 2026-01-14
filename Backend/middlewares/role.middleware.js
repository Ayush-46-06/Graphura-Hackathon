export const roleMiddleware = (allowedRole) => {
  return (req, res, next) => {


    if (req.authRole !== allowedRole) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    next();
  };
};