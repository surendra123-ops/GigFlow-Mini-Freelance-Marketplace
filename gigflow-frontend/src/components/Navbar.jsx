import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    nav("/login");
  };

  return (
   <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-30">

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight text-gray-900 hover:text-indigo-600 transition"
        >
          GigFlow
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium">
          {user ? (
            <>
              <Link to="/create-gig" className="hover:text-indigo-600">Post Gig</Link>
              <Link to="/my-gigs" className="hover:text-indigo-600">My Gigs</Link>
              <Link to="/my-bids" className="hover:text-indigo-600">My Bids</Link>
              <button 
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-600">Login</Link>
              <Link 
                to="/register" 
                className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="block md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-3 text-sm font-medium">
          {user ? (
            <>
              <Link to="/create-gig" onClick={() => setOpen(false)}>Post Gig</Link>
              <Link to="/my-gigs" onClick={() => setOpen(false)}>My Gigs</Link>
              <Link to="/my-bids" onClick={() => setOpen(false)}>My Bids</Link>
              <button 
                onClick={handleLogout}
                className="mt-2 w-full text-center px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link 
                to="/register" 
                onClick={() => setOpen(false)}
                className="block mt-2 w-full text-center px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
