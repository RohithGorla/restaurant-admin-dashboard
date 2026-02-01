import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

await MenuItem.deleteMany();
await Order.deleteMany();

const menuItems = await MenuItem.insertMany([
  {
    name: "Veg Burger",
    category: "Main Course",
    price: 120,
    ingredients: ["Bun", "Patty", "Lettuce"],
  },
  {
    name: "Chicken Pizza",
    category: "Main Course",
    price: 280,
    ingredients: ["Cheese", "Chicken"],
  },
  {
    name: "French Fries",
    category: "Appetizer",
    price: 90,
  },
  {
    name: "Chocolate Ice Cream",
    category: "Dessert",
    price: 110,
  },
  {
    name: "Cold Coffee",
    category: "Beverage",
    price: 80,
  }
]);

await Order.insertMany([
  {
    orderNumber: "ORD-1001",
    items: [
      { menuItem: menuItems[0]._id, quantity: 2, price: 120 }
    ],
    totalAmount: 240,
    customerName: "Rahul",
    tableNumber: 3,
  }
]);

console.log("Database Seeded Successfully");
process.exit();
