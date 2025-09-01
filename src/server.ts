import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index";
import spinRoutes from "./routes/spin.routes";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/api", spinRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));