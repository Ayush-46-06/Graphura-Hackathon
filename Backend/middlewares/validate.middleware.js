const validate = (schema, property) => {
  return (req, res, next) => {

    if (property === "body") {

      
      if (req.body?.tags && typeof req.body.tags === "string") {
        try {
          req.body.tags = JSON.parse(req.body.tags);
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid tags format. Expected array."
          });
        }
      }


      if (req.body?.prizePool) {
        req.body.prizePool = Number(req.body.prizePool);
      }


      if (req.body?.startDate) {
        req.body.startDate = new Date(req.body.startDate);
      }

      if (req.body?.endDate) {
        req.body.endDate = new Date(req.body.endDate);
      }
    }

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


    if (property === "query") {
      req.validatedQuery = value;
    } else {
      req[property] = value;
    }

    next();
  };
};


export const validateBody = (schema) => validate(schema, "body");
export const validateQuery = (schema) => validate(schema, "query");
export const validateParams = (schema) => validate(schema, "params");
