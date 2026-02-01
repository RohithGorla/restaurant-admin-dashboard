import Order from "../models/Order.js";
import { v4 as uuid } from "uuid";

export const getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("items.menuItem")
    .sort({ createdAt: -1 });
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const order = await Order.create({
    ...req.body,
    orderNumber: `ORD-${uuid().slice(0, 6)}`,
  });
  res.status(201).json(order);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};
