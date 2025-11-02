import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Search, X, Menu, Ticket } from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { favouriteMovies = [] } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user } = useUser();
  const { openSignIn } = useClerk();

  // ✅ Show "Favorites" only if user is logged in AND has favourites
  const showFavorites = user && favouriteMovies.length > 0;

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      {/* LOGO */}
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="logo" className="w-36 h-auto" />
      </Link>

      {/* DESKTOP MENU */}
      <nav className="hidden md:flex items-center justify-center gap-8 px-8 py-3 bg-white/10 border border-gray-300/20 rounded-full">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/">Theaters</Link>
        <Link to="/releases">Releases</Link>
        {showFavorites && <Link to="/favorite">Favorites</Link>}
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-0 left-0 z-[100] w-[75%] h-screen flex flex-col items-start justify-start gap-8 px-8 py-24 backdrop-blur bg-black/90 font-medium text-lg transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <X
          className="absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />

        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/movies" onClick={() => setIsMenuOpen(false)}>
          Movies
        </Link>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Theaters
        </Link>
        <Link to="/releases" onClick={() => setIsMenuOpen(false)}>
          Releases
        </Link>
        {showFavorites && (
          <Link to="/favorite" onClick={() => setIsMenuOpen(false)}>
            Favorites
          </Link>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-8">
        <Search className="max-md:hidden w-6 h-6 cursor-pointer" />

        {user ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Bookings"
                href="/my-bookings"
                labelIcon={<Ticket className="w-4 h-4" />}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium"
          >
            Login
          </button>
        )}

        <Menu
          className="md:hidden w-6 h-6 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;
