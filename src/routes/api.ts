// src/routes/api.ts
import express, { Router, Request, Response } from "express";
import { userRateLimiter } from "../middleware/rateLimit";

const router: Router = express.Router();

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "John Smith" },
];

// GET /api/users
router.get("/users", userRateLimiter, (req: Request, res: Response) => {
  res.json(users);
});

export default router;
