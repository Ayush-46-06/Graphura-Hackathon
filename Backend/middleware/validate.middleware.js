const validate = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: `${property} validation failed`,
        errors: error.details.map(err => ({
          field: err.path.join("."),
          message: err.message
        }))
      });
    }

    req[property] = value;
    next();
  };
};

// Small wrappers (readable)
export const validateBody = (schema) => validate(schema, "body");
export const validateQuery = (schema) => validate(schema, "query");
export const validateParams = (schema) => validate(schema, "params");
