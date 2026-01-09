export const roleMiddleware = (allowedRole) => {
  return (req, res, next) => {

    const role =
      req.admin?.role ||
      req.user?.role ||
      (req.college ? "college" : null);

    if (!role || role !== allowedRole) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    next();
  };
};