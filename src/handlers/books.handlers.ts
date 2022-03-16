import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Book, BookStore } from "../models/book.models";
import dotenv from "dotenv";

dotenv.config();

const store = new BookStore();

const index = async (_req: Request, res: Response) => {
  const books = await store.index();
  res.json(books);
};

const show = async (req: Request, res: Response) => {
  const book = await store.show(req.body.id);
  res.json(book);
};

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const book: Book = {
      title: req.body.title,
      total_pages: req.body.total_pages,
      author: req.body.author,
      type: req.body.type,
      summary: req.body.summary,
    };

    const newBook = await store.create(book);
    res.json(newBook);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const bookRoutes = (app: express.Application) => {
  app.get("books", index);
  app.get("/books/:id", show);
  app.post("/books/:id", create);
  app.delete("/books/:id", destroy);
};

export default bookRoutes;
