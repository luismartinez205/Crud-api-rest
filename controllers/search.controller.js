import * as Model from '../models/product.js';

export const getProducts = async (req, res) => {
  const search = (req.validatedQuery.search || '').toLowerCase();
    const data = await Model.getAllProducts(); 
  const result = data
  .filter(product =>
    product.name.toLowerCase().includes(search)
  )
  

  res.json({
  success: true,
  total: result.length,
  data: result
});

};

export const getSearchSuggestions = (req, res) => {
  try {
    const { query } = req.query;

    const suggestions = products
      .filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10)
      .map(product => product.name);

    res.status(200).json({
      success: true,
      total: suggestions.length,
      data: suggestions
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener sugerencias"
    });
  }
};