import express, { Express } from "express";
import apiRoutes from "./routes/api";
const app: Express = express();
const PORT: number = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

app.listen(PORT, () => {});
