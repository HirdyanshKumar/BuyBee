import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Hexagon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Hexagon className="w-8 h-8 text-amber-500 fill-amber-500/20 group-hover:fill-amber-500 transition-all" />
          <span className="text-xl font-bold tracking-tight text-white">Buy<span className="text-amber-500">Bee</span></span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-amber-400 transition-colors">Home</Link>
          <Link to="/shop" className="text-sm font-medium hover:text-amber-400 transition-colors">Shop</Link>
          <a href="#categories" className="text-sm font-medium text-neutral-400 hover:text-amber-400 transition-colors">Categories</a>
          <a href="#about" className="text-sm font-medium text-neutral-400 hover:text-amber-400 transition-colors">About</a>
        </nav>
        
        {/* Actions */}
        <div className="hidden md:flex items-center gap-5">
          <button className="text-neutral-300 hover:text-amber-400 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/cart" className="relative text-neutral-300 hover:text-amber-400 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-neutral-950 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="text-sm font-medium hover:text-amber-400">My Orders</Link>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 border border-neutral-700 rounded-lg hover:border-amber-500 hover:text-amber-500 transition-all text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium hover:text-amber-400 hidden lg:block">Sign In</Link>
              <Link 
                to="/signup" 
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-neutral-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
      </div>
      
      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-900 border-b border-neutral-800 p-4 flex flex-col gap-4 animate-fade-in">
          <Link to="/" className="p-2 hover:bg-neutral-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="p-2 hover:bg-neutral-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/cart" className="p-2 hover:bg-neutral-800 rounded-lg flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
            Cart
            {cartCount > 0 && <span className="bg-amber-500 text-neutral-950 px-2 rounded-full text-xs font-bold">{cartCount}</span>}
          </Link>
          <hr className="border-neutral-800" />
          {isAuthenticated ? (
            <>
              <Link to="/orders" className="p-2 hover:bg-neutral-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="p-2 text-left text-red-400 hover:bg-neutral-800 rounded-lg">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="p-2 hover:bg-neutral-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" className="p-2 text-amber-500 font-medium hover:bg-neutral-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
