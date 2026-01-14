import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const MyPostedGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/gigs/mine");
      setGigs(res.data);
    } catch (err) {
      console.error("Error fetching my gigs", err);
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Posted Jobs</h2>

        {gigs.length === 0 && (
          <div className="text-center text-gray-600 bg-white border py-10 rounded-lg shadow-sm">
            <p className="text-lg font-medium">No jobs posted yet.</p>
            <p className="text-sm mt-1">Create a job to start receiving bids!</p>
          </div>
        )}

        <div className="space-y-4">
          {gigs.map((g) => (
            <div key={g._id} className="bg-white p-4 rounded-lg shadow border">
              {/* Header */}
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{g.title}</h3>

                {/* Status Badge */}
                <span
                  className={`text-xs font-medium px-2 py-1 rounded 
                  ${g.status === "assigned" 
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-blue-100 text-blue-700 border border-blue-300"
                  }`}
                >
                  {g.status === "assigned" ? "Assigned" : "Open"}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mt-1 line-clamp-2">{g.description}</p>

              {/* Budget */}
              <p className="font-semibold text-gray-900 mt-2">
                Budget: <span className="text-indigo-600">${g.budget}</span>
              </p>

              {/* Total Bids */}
              <p className="text-sm text-gray-600 mt-1">
                Total Bids:{" "}
                <strong className="text-gray-800">{g.bidCount}</strong>
              </p>

              {/* Actions */}
              <div className="mt-3">
                {g.status === "open" && (
                  <Link
                    to={`/bids/${g._id}`}
                    className="inline-block text-sm bg-indigo-600 text-white py-1.5 px-4 rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Bids
                  </Link>
                )}

                {g.status === "assigned" && g.hiredFreelancerId && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-300 rounded">
                    <p className="font-semibold text-green-700">
                      Hiring Completed ✔
                    </p>
                    <p className="mt-1 text-gray-700">
                      Freelancer:{" "}
                      <strong>{g.hiredFreelancerId.name || "Unknown"}</strong>
                    </p>
                    <p className="text-gray-600">
                      Email: {g.hiredFreelancerId.email || "N/A"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPostedGigs;
