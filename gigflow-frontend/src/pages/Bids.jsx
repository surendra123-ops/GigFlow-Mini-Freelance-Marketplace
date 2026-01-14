import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const Bids = () => {
  const { gigId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const [owner, setOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasBid, setHasBid] = useState(false);

  const load = async () => {
    setLoading(true);

    const gigsRes = await api.get(`/gigs?search=`);
    const currentGig = gigsRes.data.find((g) => g._id === gigId);
    setGig(currentGig);

    if (!currentGig) {
      setLoading(false);
      return;
    }

    try {
      const bidRes = await api.get(`/bids/${gigId}`);
      setBids(bidRes.data);
      setOwner(true);
      setLoading(false);
      return;
    } catch (err) {
      setOwner(false);
    }

    try {
      const myBids = await api.get(`/bids/mine/${gigId}`);
      if (myBids.data?.hasBid) setHasBid(true);
    } catch {}

    setLoading(false);
  };

  const submitBid = async () => {
    if (!price || !msg) {
      alert("Enter price and message");
      return;
    }

    try {
      await api.post("/bids", { gigId, message: msg, price });
      setHasBid(true);
      setMsg("");
      setPrice("");
      alert("Bid submitted!");
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting bid");
    }
  };

  const hire = async (id) => {
    try {
      await api.patch(`/bids/${id}/hire`);
      load();
    } catch {
      alert("Error hiring freelancer");
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!gig) return <div className="p-4">Gig not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          className="mb-4 text-sm font-medium text-gray-700 hover:underline"
          onClick={() => navigate("/")}
        >
          ← Back to Gigs
        </button>

        {/* Gig Details */}
        <div className="bg-white p-5 rounded-lg border shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{gig.title}</h2>
          <p className="text-gray-700 mt-1">{gig.description}</p>

          <p className="mt-3 font-medium text-gray-900">
            Budget: <span className="text-indigo-600">${gig.budget}</span>
          </p>

          <p className="text-sm mt-2">
            Status:{" "}
            <span
              className={`px-2 py-1 text-xs rounded border ${
                gig.status === "assigned"
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-green-100 text-green-700 border-green-300"
              }`}
            >
              {gig.status}
            </span>
          </p>
        </div>

        {/* Freelancer View */}
        {!owner && (
          <>
            {gig.status === "assigned" ? (
              <div className="text-red-600 font-medium bg-red-50 border border-red-300 p-3 rounded mb-4">
                This gig is already assigned. You cannot bid.
              </div>
            ) : hasBid ? (
              <div className="text-blue-600 font-medium bg-blue-50 border border-blue-300 p-3 rounded mb-4">
                You already placed a bid on this gig.
              </div>
            ) : (
              <div className="bg-white p-4 border rounded-lg shadow-sm mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Place a Bid</h3>

                <input
                  placeholder="Your bid price"
                  className="border px-3 py-2 w-full rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <textarea
                  placeholder="Your message to the client..."
                  className="border px-3 py-2 w-full rounded-lg h-24 resize-none focus:ring-2 focus:ring-indigo-500"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />

                <button
                  onClick={submitBid}
                  className="bg-indigo-600 text-white w-full py-2 rounded-lg mt-3 font-medium hover:bg-indigo-700 transition"
                >
                  Submit Bid
                </button>
              </div>
            )}
          </>
        )}

        {/* Owner View */}
        {owner && (
          <>
            <h3 className="font-semibold text-lg mb-2">Bids Received</h3>

            {bids.length === 0 ? (
              <div className="text-gray-600 bg-white p-4 border rounded">
                No bids yet.
              </div>
            ) : (
              <div className="space-y-3">
                {bids.map((b) => (
                  <div key={b._id} className="bg-white p-4 border rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-900">
                      {b.freelancerId.name}
                    </p>
                    <p className="text-indigo-600 font-medium">${b.price}</p>
                    <p className="text-gray-700 mt-1">{b.message}</p>

                    <p className="text-sm mt-2">
                      Status:{" "}
                      <span className="font-semibold capitalize">
                        {b.status}
                      </span>
                    </p>

                    {b.status === "pending" && gig.status !== "assigned" && (
                      <button
                        onClick={() => hire(b._id)}
                        className="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm mt-3 hover:bg-green-700 transition"
                      >
                        Hire
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Bids;
