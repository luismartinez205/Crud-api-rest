import * as Model from '../models/product.js';

//buscar todos los productos y los filtrados por su query y se fija un limite .
export const getAllProducts = async (req, res) => {
  const { category, name, featured, brand, limit,id,slug } = req.query;

  let products = await Model.getAllProducts();

  if (category) {
    products = products.filter(
      p => p.category?.toLowerCase() === category.toLowerCase()
    );
  }

  if (name) {
    products = products.filter(
      p => p.name?.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (featured) {
  products = products.filter(
    p => p.featured === (featured === 'true')
  );
}

  if (brand) {
    products = products.filter(
      p => p.brand?.toLowerCase() === brand.toLowerCase()
    );
  }

  if (limit) {
    const numLimit = Number(limit);
    if (!isNaN(numLimit) && numLimit > 0) {
      products = products.slice(0, numLimit);
    }
  }

  if (id) {
    products = products.filter(p => p.id === id);
  }
  
  if (slug) {
    products = products.filter(p => p.slug === slug);
  }


  res.json(products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category,
    brand: p.brand,
    featured: p.featured,
    images: p.images || []
  })));
};


//buscar productos por su id
export const getProductById = async (req, res) => {
  const product = await Model.getProductById((req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};


export const createProduct = async (req, res) => {
  const { name, price, category, ...otherFields } = req.body ?? {};
  
  // Validar campos requeridos
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (price === undefined || price === null || price === '') {
    return res.status(400).json({ message: 'Price is required' });
  }
  if (!category || category.trim() === '') {
    return res.status(400).json({ message: 'Category is required' });
  }

  // Manejar price como número o como objeto con propiedad 'current'
  let finalPrice = price;
  if (typeof price === 'object' && price !== null && 'current' in price) {
    finalPrice = price.current;
  }
  
  const numPrice = Number(finalPrice);
  if (isNaN(numPrice) || numPrice < 0) {
    return res.status(400).json({ message: 'Price must be a valid positive number' });
  }

  const newProduct = {
    id: Date.now().toString(),
    name: name.trim(),
    price: typeof price === 'object' ? price : numPrice,
    category: category.trim(),
    ...otherFields
  };
  
  const products = await Model.createProduct(newProduct);
  res.status(201).json({ message: 'Product created successfully', product: products });
};


//eliminar producto por id
export const deleteProductById = async (req, res) => {
  const success = await Model.deleteProductById(req.params.id);
  if (!success) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ message: 'Product deleted successfully' });
};


//actualizar productos
export const updateProductById = async (req, res) => {
  const { name, price, category, ...otherFields } = req.body ?? {};
  const product = await Model.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Validar y procesar price si se proporciona
  let finalPrice = price;
  if (price !== undefined) {
    if (typeof price === 'object' && price !== null && 'current' in price) {
      finalPrice = price.current;
    }
    
    const numPrice = Number(finalPrice);
    if (isNaN(numPrice) || numPrice < 0) {
      return res.status(400).json({ message: 'Price must be a valid positive number' });
    }
  }

  const updatedFields = {
    ...(name && { name: name.trim() }),
    ...(price !== undefined && { price: typeof price === 'object' ? price : finalPrice }),
    ...(category && { category: category.trim() }),
    ...otherFields
  };

  const updatedProduct = await Model.updateProductById(req.params.id, updatedFields);
  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product updated successfully', product: updatedProduct });
};

//actualizar solo el stock de un producto
export const updateProductStock = async (req, res) => {
  const { stock, quantity } = req.body ?? {};

  if (stock === undefined && quantity === undefined) {
    return res.status(400).json({ message: 'Stock or quantity is required' });
  }

  const product = await Model.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  let newStock;

  if (stock !== undefined) {
    // Fijar un valor absoluto de stock
    newStock = Number(stock);
  } else {
    // Ajustar el stock actual (sumar o restar, ej: -1 al vender una unidad)
    const currentStock = Number(product.stock) || 0;
    newStock = currentStock + Number(quantity);
  }

  if (isNaN(newStock) || newStock < 0) {
    return res.status(400).json({ message: 'Stock must be a valid non-negative number' });
  }

  const updatedProduct = await Model.updateProductById(req.params.id, { stock: newStock });

  res.json({ message: 'Stock updated successfully', product: updatedProduct });
};

