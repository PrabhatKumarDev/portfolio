import express from "express";
import { createTracker, getTrackers } from "../controllers/tracker.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createTracker);
router.get("/", getTrackers);

export default router;