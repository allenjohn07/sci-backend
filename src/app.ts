import express, { Application } from "express";
import router from "./routes";
import auth from "./routes/auth";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions";
dotenv.config();

// Initialize the express app.
const app: Application = express();

// Enable CORS
app.use(corsOptions);

// Middleware setup.
app.use(express.json());
app.use("/", router);
app.use("/api/auth", auth);

// Export the app to be used elsewhere.
export default app;
