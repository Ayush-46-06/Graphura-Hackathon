export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    const role = req.user?.role || req.admin?.role; 
    if (!role || !roles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }
    next();
  };
};
