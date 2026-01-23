import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon, Globe, Mail, MessageCircle, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <Hexagon className="w-8 h-8 text-amber-500 fill-amber-500/20 group-hover:fill-amber-500 transition-all" />
              <span className="text-xl font-bold tracking-tight text-white">Buy<span className="text-amber-500">Bee</span></span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              The premier destination for highly curated, premium quality lifestyle products. Discover what you love.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Electronics</Link></li>
              <li><Link to="/shop" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Fashion</Link></li>
              <li><Link to="/shop" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Home & Living</Link></li>
              <li><Link to="/shop" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Sports</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Track Order</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-amber-400 text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} BuyBee. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-neutral-500">
            <Hexagon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
