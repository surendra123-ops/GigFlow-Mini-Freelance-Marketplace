import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import Bids from "./pages/Bids";
import ProtectedRoute from "./ProtectedRoute";
 import MyBids from "./pages/MyBids";
 import MyPostedGigs from "./pages/MyPostedGigs";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/create-gig" element={
          <ProtectedRoute><CreateGig/></ProtectedRoute>
        }/>

        <Route path="/bids/:gigId" element={
          <ProtectedRoute><Bids/></ProtectedRoute>
        }/>

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

      </Routes>

      
    </>
  );
};

export default App;
