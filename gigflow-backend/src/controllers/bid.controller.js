import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";

// =========== SUBMIT BID ===========
export const submitBid = async (req, res, next) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price)
      return res.status(400).json({ message: "All fields required" });

    const existingBid = await Bid.findOne({ gigId, freelancerId: req.user.id });
    if (existingBid) {
      return res.status(400).json({ message: "You already submitted a bid for this gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price
    });

    res.json({ message: "Bid submitted", bid });
  } catch (err) {
    next(err);
  }
};

// =========== GET BIDS BY GIG ===========
export const getBidsByGig = async (req, res, next) => {
  try {
    const { gigId } = req.params;
    const gig = await Gig.findById(gigId);

    if (!gig) return res.status(404).json({ message: "Gig not found" });
    if (gig.ownerId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (err) {
    next(err);
  }
};

// =========== MY BIDS (FREELANCER VIEW) ===========
export const myBids = async (req, res, next) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user.id })
      .populate("gigId", "title budget status")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (err) {
    next(err);
  }
};

// =========== HIRE BID ===========
export const hireBid = async (req, res, next) => {
  try {
    const bidId = req.params.bidId;

    const chosenBid = await Bid.findById(bidId);
    if (!chosenBid) return res.status(404).json({ message: "Bid not found" });

    const gig = await Gig.findById(chosenBid.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    // Only owner can hire
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update gig
    gig.status = "assigned";
    gig.hiredFreelancerId = chosenBid.freelancerId;
    await gig.save();

    // Update selected bid
    chosenBid.status = "hired";
    await chosenBid.save();

    // Reject others
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { $set: { status: "rejected" } }
    );

    res.json({ message: "Freelancer hired successfully" });
  } catch (err) {
    next(err);
  }
};
