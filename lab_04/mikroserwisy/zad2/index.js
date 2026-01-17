import express from "express";
import axios from "axios";
import { Sequelize, DataTypes, Model } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  NotNull,
  Table,
} from "@sequelize/core/decorators-legacy";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const port = 3001;

app.use(express.json());

const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: "orders.db",
});
class Order extends Model {}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: false,
  }
);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/api/orders/:userId", async (req, res) => {
  const orderList = await Order.findAll({
    where: { userId: req.params.userId },
  });
  res.json(orderList);
});

async function checkIfBookExists(bookId) {
  const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
  if (response === null) return false;
  else return true;
}

app.post("/api/orders", authenticateToken, async (req, res) => {
  if (checkIfBookExists(req.body.bookId)) {
    const order = await Order.create({
      userId: req.body.userId,
      bookId: req.body.bookId,
      quantity: req.body.quantity,
    });
    res.send(order.id);
  } else res.send(`Książka o id ${req.body.bookId} nie istnieje`);
});

app.delete("/api/orders/:orderId", authenticateToken, async (req, res) => {
  const deleted = await Order.destroy({
    where: { id: req.params.orderId },
  });
  if (deleted === 0) {
    res.send("Order not found");
    return;
  }
  res.send("Order deleted");
});

app.patch("/api/orders/:orderId", authenticateToken, async (req, res) => {
  const order = await Order.findByPk(req.params.orderId);
  if (!order)
    return res.json(`Order o id ${req.params.orderId} nie znaleziony`);

  await order.update(req.body);
  res.send("Order upadated");
});
