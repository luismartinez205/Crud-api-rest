import * as Model from '../models/order.js';

//buscar todas las ordenes y las filtradas por su campo
export const getAllOrders = async (req, res) => {
  const { status, paymentmethod, orderNumber,id,customerid } = req.query;
  const orders = await Model.getAllOrders();
  let filteredOrders = orders;

  if (status) {
    filteredOrders = orders.filter(p => p.status === status);
  }

  if (paymentmethod) {
    filteredOrders = orders.filter(p => p.paymentmethod === paymentmethod);
  }

  if (orderNumber) {
    filteredOrders = orders.filter(p => p.orderNumber === orderNumber);
  }

  if (id) {
    filteredOrders = orders.filter(p => p.id === id);
  }

  if (customerid) {
    filteredOrders = orders.filter(p => p.customerid === customerid);
  }

  res.json(filteredOrders);
};


//buscar orden por su id
export const getOrderById = async (req, res) => {
  const order = await Model.getOrderById((req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

//eliminar orden por su id
export const deleteOrderById = async (req, res) => {
  const success = await Model.deleteOrderById(req.params.id);
  if (!success) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json({ message: 'Order deleted successfully' });
};


//actualizar ordenes (CORREGIDO: ahora si guarda los cambios)
export const updateOrderById = async (req, res) => {
  const updates = req.body ?? {};

  const order = await Model.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const updatedOrder = await Model.updateOrderById(req.params.id, updates);

  res.json({ message: 'Order updated successfully', order: updatedOrder });
};


//crear una nueva orden (CORREGIDO: usa los campos correctos de una orden)
export const createOrder = async (req, res) => {
  const { orderNumber, paymentmethod, items, totals, ...otherFields } = req.body ?? {};
  const uid = req.user.uid;

  if (!uid) {
    return res.status(400).json({ message: 'User id is required' });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Items are required' });
  }

  if (totals === undefined || totals === null) {
    return res.status(400).json({ message: 'Totals is required' });
  }

  const newOrder = {
    id: Date.now().toString(),
    orderNumber: orderNumber ?? `ORD-${Date.now()}`,
    customerid: uid,
    paymentmethod,
    items,
    totals,
    status: 'pending',
    ...otherFields
  };

  const order = await Model.createOrder(newOrder);
  res.status(201).json({ message: 'Order created successfully', order });
};


//buscar las ordenes del usuario autenticado
export const getMyOrders = async (req, res) => {
  const uid = req.user.uid;
  const orders = await Model.getAllOrders();
  const myOrders = orders.filter(order => order.customerid === uid);
  res.json(myOrders);
};


//actualizar solo el estado de la orden
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body ?? {};

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  const order = await Model.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const updatedOrder = await Model.updateOrderById(req.params.id, { status });

  res.json({ message: 'Order status updated successfully', order: updatedOrder });
};




