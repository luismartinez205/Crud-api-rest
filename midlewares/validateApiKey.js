const API_KEY = process.env.APIKEY;

export const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({
      error: "API Key inválida"
    });
  }

  next();
};

export default validateApiKey;