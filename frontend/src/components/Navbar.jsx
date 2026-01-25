import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between">
      <Link to="/" className="font-semibold">
        BuyBee
      </Link>

      <div className="space-x-4">
        <Link to="/">Products</Link>

        {isLoggedIn ? (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/admin">Admin</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

