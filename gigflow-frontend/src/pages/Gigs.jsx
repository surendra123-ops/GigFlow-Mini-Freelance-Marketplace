import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Gigs = () => {
  const { user } = useContext(AuthContext);
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/gigs?search=${search}`);
      setGigs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            className="border border-gray-300 px-3 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search gigs..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
          />
          <button
            onClick={load}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Gigs</h2>

        {/* Empty State */}
        {gigs.length === 0 && !loading && (
          <div className="text-center text-gray-600 py-16 bg-white border rounded-lg shadow-sm">
            <p className="text-lg font-medium">No gigs found</p>
            <p className="text-sm mt-1">Try changing search filters</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gigs.map((g) => (
            <div
              key={g._id}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {g.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {g.description}
              </p>

              {/* Budget */}
              <p className="mt-2 font-medium text-gray-900">
                Budget: <span className="text-indigo-600">${g.budget}</span>
              </p>

              {/* Status Badge */}
              <div className="mt-2">
                {g.status === "assigned" ? (
                  <span className="text-xs font-medium bg-red-100 text-red-700 border border-red-300 px-2 py-1 rounded">
                    Assigned
                  </span>
                ) : (
                  <span className="text-xs font-medium bg-green-100 text-green-700 border border-green-300 px-2 py-1 rounded">
                    Open
                  </span>
                )}
              </div>

              {/* Button / Info */}
              <div className="mt-4">
                {g.status === "assigned" ? (
                  <div className="text-xs font-medium text-gray-600">
                    Hiring Completed ✔
                  </div>
                ) : g.hasBid ? (
                  <div className="text-xs font-medium text-indigo-600">
                    Bid Submitted ✓
                  </div>
                ) : (
                  <Link
                    to={`/bids/${g._id}`}
                    className="inline-block w-full text-center bg-indigo-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    View / Bid
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
