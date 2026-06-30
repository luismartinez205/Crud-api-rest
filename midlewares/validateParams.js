
export const validateParams = (schema) => {
  return (req, res, next) => {

    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors
      });
    }

    req.validatedParams = result.data;

    next();
  };
};