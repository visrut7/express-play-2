// src/routes/api.ts
import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

// GET /api/users
router.get("/cookie", (req: Request, res: Response) => {
  res.json({ message: "Cookie received 2" });
});

export default router;
