import Gig from "../models/gig.model.js";
import Bid from "../models/bid.model.js";

// =========== GET OPEN GIGS ===========
export const getOpenGigs = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const gigs = await Gig.find({
      status: "open",
      title: { $regex: search, $options: "i" }
    }).sort({ createdAt: -1 }).lean();

    if (!req.user) return res.json(gigs);

    // Attach hasBid info for logged user
    const result = await Promise.all(
      gigs.map(async (gig) => {
        const already = await Bid.findOne({
          gigId: gig._id,
          freelancerId: req.user.id
        });

        return {
          ...gig,
          hasBid: !!already
        };
      })
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// =========== CREATE GIG ===========
export const createGig = async (req, res, next) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget)
      return res.status(400).json({ message: "All fields required" });

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id
    });

    res.json({ message: "Gig created", gig });
  } catch (err) {
    next(err);
  }
};

// =========== MY POSTED GIGS ===========
export const myGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user.id })
      .populate("hiredFreelancerId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const result = await Promise.all(
      gigs.map(async (gig) => {
        const bidCount = await Bid.countDocuments({ gigId: gig._id });
        return {
          ...gig,
          bidCount
        };
      })
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};
