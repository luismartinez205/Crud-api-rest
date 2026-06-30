import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as UserModel from '../models/user.js'; // <-- revisar/corregir esta ruta

// Registro publico de nuevos usuarios
export const register = async (req, res) => {
  try {
    const { name, mail, password, adress, phone, ...otherFields } = req.body ?? {};

    if (!name?.trim() || !mail?.trim() || !password) {
      return res.status(400).json({
        message: 'Nombre, email y contraseña son requeridos'
      });
    }

    const existingUser = await UserModel.getUserByEmail(mail);

    if (existingUser) {
      return res.status(400).json({
        message: 'El email ya está registrado'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      role: 'customer', // siempre customer al registrarse, nunca admin
      mail: mail.trim(),
      password: hashedPassword,
      adress: adress?.trim() || '',
      phone: phone?.trim() || '',
      ...otherFields
    };

    const user = await UserModel.createUser(newUser);

    // Generar JWT para iniciar sesion automaticamente tras registrarse
    const token = jwt.sign(
      {
        uid: user.id,
        role: user.role,
        mail: user.mail
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email y password son requeridos'
      });
    }

    const user = await UserModel.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: 'Credenciales inválidas'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Credenciales inválidas'
      });
    }

    // Generar JWT (CORREGIDO: uid: user.id, no user.uid)
    const token = jwt.sign(
      {
        uid: user.id,
        role: user.role,
        mail: user.mail
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


export const profile = async (req, res) => {
  // CORREGIDO: req.user.uid en vez de req.user.id
  const user = await UserModel.getUserById(req.user.uid);

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  res.json({
    id: user.id,
    name: user.name,
    mail: user.mail, // CORREGIDO: mail en vez de email
    role: user.role
  });
};


export const logout = (req, res) => {
  res.json({
    success: true,
    message: "Sesión cerrada"
  });
};