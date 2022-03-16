import express, { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../middleware/verifyAuthToken";
import { User, UserStore } from "../models/user.models";

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.body.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password_digest: req.body.password_digest,
    phone: req.body.phone,
    about: req.body.about,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password_digest: req.body.password_digest,
    phone: req.body.phone,
    about: req.body.about,
  };
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded.id !== user.id) {
      throw new Error("User id does not match!");
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
  
  try {
    const newUser = await store.update(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password_digest: req.body.password_digest,
    first_name: "",
    last_name: "",
    phone: 0,
    about: "",
  };
  try {
    const u = await store.authenticate(user.username, user.password_digest);
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get("users", index);
  app.get("/users/:id", show);
  app.post("/users/:id", verifyAuthToken, create);
  app.put("/users/:id", verifyAuthToken, update);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

export default userRoutes;
