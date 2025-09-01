import { Router } from "express";
import { handleOrder, handleSpin } from "../controllers/spin.controller";

const router = Router();

router.post("/order", handleOrder);
router.post("/spin", handleSpin);

export default router;