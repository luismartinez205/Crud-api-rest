import * as Model from '../models/category.js';

//buscar todas las categorias y las filtradas por su query
export const getAllCategories = async (req, res) => {
  const { category, name} = req.query;
  const categories = await Model.getAllCategories();
  let filteredCategories = categories;
  if (category) {
    filteredCategories = categories.filter(p => p.category === category);
  }

  if (name) {
    filteredCategories = categories.filter(p => p.name === name);
  }

  res.json(filteredCategories);
};


//buscar categorias por su id
export const getCategoryById = async (req, res) => {
  const category = await Model.getCategoryById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
};

//eliminar categoria por su id
export const deleteCategoryById = async (req, res) => {
  const success = await Model.deleteCategoryById(req.params.id);
  if (!success) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json({ message: 'Category deleted successfully' });
};

//actualizar categorias
export const updateCategoryById = async (req, res) => {
  const { name, category, ...otherFields } = req.body ?? {};
  const categoryExists = await Model.getCategoryById(req.params.id);
  if (!categoryExists) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const updatedCategoryData = {
    ...(name !== undefined && name !== null ? { name: String(name).trim() } : {}),
    ...(category !== undefined && category !== null ? { category: String(category).trim() } : {}),
    ...otherFields
  };

  if (Object.keys(updatedCategoryData).length === 0) {
    return res.status(400).json({ message: 'No fields provided to update' });
  }

  const updatedCategory = await Model.updateCategoryById(req.params.id, updatedCategoryData);
  res.json({ message: 'Category updated successfully', category: updatedCategory });
};

export const createCategory = async (req, res) => {
  const { name, slug,  ...otherFields } = req.body ?? {};

  // Derivar valores desde campos anidados si no están en la raíz
  const derivedName = name ?? customer?.name;
  
  

  // Validar campos requeridos derivados
  if (!derivedName || (typeof derivedName === 'string' && derivedName.trim() === '')) {
    return res.status(400).json({ message: 'Name is required' });
  }
  
  const newCategory = {
    id: Date.now().toString(),
    name: typeof derivedName === 'string' ? derivedName.trim() : derivedName,   
    slug: slug?.trim() || '',
    ...otherFields
  };

  const categories = await Model.createCategory(newCategory);
  res.status(201).json({ message: 'Category created successfully', categories });
};


