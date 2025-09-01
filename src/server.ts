import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import orderRouter from "./controllers/order.controller";
import userRouter from "./controllers/user.controller";
import spinRoutes from "./routes/spin.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api", spinRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error(err));
