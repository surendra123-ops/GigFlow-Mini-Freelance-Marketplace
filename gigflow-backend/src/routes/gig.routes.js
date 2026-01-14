import express from "express";
import { getOpenGigs, createGig } from "../controllers/gig.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { myGigs } from "../controllers/gig.controller.js";

const router = express.Router();
router.get("/", getOpenGigs);
router.post("/", protect, createGig);



router.get("/mine", protect, myGigs);

export default router;
