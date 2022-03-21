import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Order, OrderStore } from "../models/order.models";
import dotenv from "dotenv";

dotenv.config();

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.body.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader: string = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader: string = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const currentOrderByUser = async (_req: Request, res: Response) => {
  const userId: string = _req.params.userId;

  try {
    const currentOrderByUser = await store.currentOrderByUser(userId);
    res.json(currentOrderByUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completedOrdersByUser = async (_req: Request, res: Response) => {
  const userId: string = _req.params.userId;

  try {
    const completedOrdersByUser = await store.completedOrdersByUser(userId);
    res.json(completedOrdersByUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.delete("/orders/:id", destroy);
  app.post("/orders/:id/products", addProduct);
  app.get("/current-orders-by-user/:id", currentOrderByUser);
  app.get("/completed-orders-by-user/:id", completedOrdersByUser);
};

export default orderRoutes;
