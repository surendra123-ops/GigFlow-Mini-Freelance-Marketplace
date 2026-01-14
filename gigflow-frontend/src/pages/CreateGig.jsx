import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !budget) {
      return setErr("All fields are required!");
    }

    try {
      setLoading(true);
      await api.post("/gigs", { title, description: desc, budget });
      nav("/");
    } catch (err) {
      setErr(err.response?.data?.message || "Failed to create gig.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Post a New Gig
        </h2>
        <p className="text-sm text-gray-500 text-center -mt-2">
          Fill in details to hire freelancers
        </p>

        {err && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-300">
            {err}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Gig Title
          </label>
          <input
            type="text"
            placeholder="Ex: Build my portfolio website"
            className="border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Gig Description
          </label>
          <textarea
            placeholder="Describe the work clearly..."
            className="border px-3 py-2 w-full rounded-lg h-28 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Budget (USD)
          </label>
          <input
            type="number"
            placeholder="Ex: 200"
            className="border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Gig"}
        </button>
      </form>
    </div>
  );
};

export default CreateGig;
