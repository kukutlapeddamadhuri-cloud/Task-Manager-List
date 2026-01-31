import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.todos.list.path, async (_req, res) => {
    const todos = await storage.getTodos();
    res.json(todos);
  });

  app.post(api.todos.create.path, async (req, res) => {
    try {
      const input = api.todos.create.input.parse(req.body);
      const todo = await storage.createTodo(input);
      res.status(201).json(todo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.patch(api.todos.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = api.todos.update.input.parse(req.body);
      const updated = await storage.updateTodo(id, input);
      if (!updated) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete(api.todos.delete.path, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteTodo(id);
    res.status(204).send();
  });

  // Seed data
  const existingTodos = await storage.getTodos();
  if (existingTodos.length === 0) {
    await storage.createTodo({ text: "Welcome to your Todo List!", completed: false });
    await storage.createTodo({ text: "Mark tasks as completed", completed: true });
    await storage.createTodo({ text: "Add your own tasks", completed: false });
  }

  return httpServer;
}
