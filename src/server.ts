import express from "express";
import { connectDB } from "./db/index";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Sales Reward Spinner API is running!");
});

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
