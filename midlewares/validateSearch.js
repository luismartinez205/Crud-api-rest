export const validateSearch = (schema) => {
  return (req, res, next) => {

    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors
      });
    }

    req.validatedQuery = result.data;

    next();
  };
};