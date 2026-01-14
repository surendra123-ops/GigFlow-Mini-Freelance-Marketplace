import { useEffect, useState } from "react";
import api from "../api/axios";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/bids/my");
      setBids(res.data);
    } catch (err) {
      console.error("Error fetching bids", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <div className="h-5 w-5 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Bids</h2>

        {bids.length === 0 && (
          <div className="text-center text-gray-600 bg-white border py-10 rounded-lg shadow-sm">
            <p className="text-lg font-medium">No bids placed yet.</p>
            <p className="text-sm mt-1">Start bidding on jobs to get hired!</p>
          </div>
        )}

        <div className="space-y-4">
          {bids.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded-lg shadow border">
              {/* Gig title */}
              <p className="text-lg font-semibold text-gray-900">
                {b.gigId?.title || "Unknown Gig"}
              </p>

              {/* Bid info */}
              <p className="mt-1 text-gray-700">
                Bid Amount:{" "}
                <span className="font-semibold text-indigo-600">${b.price}</span>
              </p>

              {/* Bid Status */}
              <p className="mt-2 text-sm">
                Bid Status:{" "}
                <span
                  className={`
                    px-2 py-0.5 text-xs font-medium rounded border
                    ${b.status === "hired"
                      ? "bg-green-100 text-green-700 border-green-300"
                      : b.status === "rejected"
                      ? "bg-red-100 text-red-700 border-red-300"
                      : "bg-blue-100 text-blue-700 border-blue-300"
                    }
                  `}
                >
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </p>

              {/* Gig Status */}
              <p className="mt-1 text-sm text-gray-700">
                Gig Status:{" "}
                <span
                  className={`
                    px-2 py-0.5 text-xs font-medium rounded border
                    ${b.gigId?.status === "assigned"
                      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                    }
                  `}
                >
                  {b.gigId?.status
                    ? b.gigId.status.charAt(0).toUpperCase() + b.gigId.status.slice(1)
                    : "Unknown"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBids;
