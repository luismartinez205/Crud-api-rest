import * as Model from '../models/user.js';
import bcrypt from 'bcryptjs';

// Obtener todos los usuarios y los filtrados por sus campos
export const getAllUsers = async (req, res) => {
  const { role, name, id } = req.query;

  let users = await Model.getAllUsers();

  if (role) {
    users = users.filter(p => p.role?.toLowerCase() === role.toLowerCase());
  }

  if (name) {
    users = users.filter(p => p.name?.toLowerCase() === name.toLowerCase());
  }

  if (id) {
    users = users.filter(p => p.uid?.toLowerCase() === id.toLowerCase());
  }
  res.json(users);
};


// Obtener usuario por ID
export const getUserById = async (req, res) => {
  const user = await Model.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};


// Crear usuario (CORREGIDO: orden de destructuring)
export const createUser = async (req, res) => {
  const {
    name,
    role,
    email,
    mail,
    password,
    adress,
    phone,
    ...otherFields
  } = req.body ?? {};

  const userEmail = email?.trim() || mail?.trim();

  if (!name?.trim() || !userEmail || !password) {
    return res.status(400).json({
      message: 'Nombre, email y contraseña son requeridos'
    });
  }

  const existingUser = await Model.getUserByEmail(userEmail);

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'El email ya está registrado'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    name: name.trim(),
    role: role?.trim() || 'customer',
    mail: userEmail,
    password: hashedPassword,
    adress: adress?.trim() || '',
    phone: phone?.trim() || '',
    ...otherFields
  };

  const user = await Model.createUser(newUser);

  res.status(201).json({
    message: 'Usuario registrado con éxito',
    user: user.id
  });
};



export const updateUserById = async (req, res) => {
  const {
    name,
    role,
    email,
    mail,
    adress,
    phone,
    ...otherFields
  } = req.body ?? {};

  const userEmail = email?.trim() || mail?.trim();

  const user = await Model.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const updatedUser = {
    ...user,
    ...(name && { name: name.trim() }),
    ...(role && { role: role.trim() }),
    ...(userEmail && { mail: userEmail }),
    ...(adress && { adress: adress.trim() }),
    ...(phone && { phone: phone.trim() }),
    ...otherFields
  };

  const savedUser = await Model.updateUserById(req.params.id, updatedUser);

  res.json({
    message: 'Usuario actualizado con éxito',
    user: savedUser.id
  });
};


// Eliminar usuario
export const deleteUserById = async (req, res) => {
  const success = await Model.deleteUserById(req.params.id);

  if (!success) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json({ message: 'Usuario eliminado con éxito' });
};


// Obtener el perfil del usuario autenticado
export const getMyProfile = async (req, res) => {
  const user = await Model.getUserById(req.user.uid);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};


// Actualizar el perfil del usuario autenticado
export const updateMyProfile = async (req, res) => {
  const {
    name,
    email,
    mail,
    adress,
    phone,
    role,     // se ignora: un usuario no puede cambiar su propio rol
    password, // se ignora: para esto existe /users/me/password
    ...otherFields
  } = req.body ?? {};

  const userEmail = email?.trim() || mail?.trim();

  const user = await Model.getUserById(req.user.uid);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const updatedUser = {
    ...user,
    ...(name && { name: name.trim() }),
    ...(userEmail && { mail: userEmail }),
    ...(adress && { adress: adress.trim() }),
    ...(phone && { phone: phone.trim() }),
    ...otherFields
  };

  const savedUser = await Model.updateUserById(req.user.uid, updatedUser);

  const { password: _pw, ...userWithoutPassword } = savedUser;
  res.json({
    message: 'Perfil actualizado con éxito',
    user: userWithoutPassword
  });
};


// Cambiar contraseña del usuario autenticado
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body ?? {};

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: 'La contraseña actual y la nueva son requeridas'
    });
  }

  const user = await Model.getUserById(req.user.uid);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await Model.updateUserById(req.user.uid, {
    ...user,
    password: hashedPassword
  });

  res.json({ message: 'Contraseña actualizada con éxito' });
};

