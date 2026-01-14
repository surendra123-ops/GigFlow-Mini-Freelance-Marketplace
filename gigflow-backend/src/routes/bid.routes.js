import express from "express";
import { submitBid, getBidsByGig, hireBid , myBids} from "../controllers/bid.controller.js";
import { protect } from "../middleware/auth.middleware.js";

import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";

const router = express.Router();

router.post("/", protect, submitBid);
router.get("/my", protect, myBids);
router.get("/:gigId", protect, getBidsByGig);
router.patch("/:bidId/hire", protect, hireBid);
router.get("/mine/:gigId", protect, async (req, res) => {
  const exists = await Bid.findOne({ gigId: req.params.gigId, freelancerId: req.user.id });
  res.json({ hasBid: !!exists });
});




export default router;
