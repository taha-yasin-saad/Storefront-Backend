import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Product, ProductStore } from "../models/product.models";
import dotenv from "dotenv";

dotenv.config();

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.body.id);
  res.json(product);
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
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
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

const fiveMostPopular = async (_req: Request, res: Response) => {
  const products = await store.fiveMostPopular();
  res.json(products);
};

const productRoutes = (app: express.Application) => {
  app.get("products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.delete("/products/:id", destroy);
  app.get("/five-most-popular", fiveMostPopular);
};

export default productRoutes;
