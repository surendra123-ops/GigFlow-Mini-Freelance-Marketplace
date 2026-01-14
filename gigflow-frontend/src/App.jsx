import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import Bids from "./pages/Bids";
import ProtectedRoute from "./ProtectedRoute";
import MyBids from "./pages/MyBids";
import MyPostedGigs from "./pages/MyPostedGigs";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Gigs />} />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />

        {/* Protected Pages */}
        <Route
          path="/create-gig"
          element={
            <ProtectedRoute>
              <CreateGig />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bids/:gigId"
          element={
            <ProtectedRoute>
              <Bids />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-gigs"
          element={
            <ProtectedRoute>
              <MyPostedGigs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bids"
          element={
            <ProtectedRoute>
              <MyBids />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
