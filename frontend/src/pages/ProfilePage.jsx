import React from 'react';
import { User, Mail, Shield, LogOut, Package } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/20">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">My Profile</h1>
              <p className="text-neutral-400">Manage your account settings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Account Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                <h2 className="text-xl font-bold mb-6 text-white border-b border-neutral-800 pb-4">Personal Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-neutral-500 block mb-1">Full Name</label>
                    <div className="flex items-center gap-3 text-white font-medium bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                      <User className="w-5 h-5 text-amber-500" />
                      {user?.name || 'User'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-500 block mb-1">Email Address</label>
                    <div className="flex items-center gap-3 text-white font-medium bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                      <Mail className="w-5 h-5 text-amber-500" />
                      {user?.email || 'user@example.com'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-500 block mb-1">Account Role</label>
                    <div className="flex items-center gap-3 text-white font-medium bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                      <Shield className="w-5 h-5 text-amber-500" />
                      {user?.role || 'Customer'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
                <div className="space-y-3">
                  <Link 
                    to="/orders" 
                    className="flex items-center gap-3 w-full bg-neutral-950 border border-neutral-800 hover:border-amber-500 text-white p-4 rounded-xl transition-all group"
                  >
                    <div className="bg-amber-500/10 p-2 rounded-lg group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                      <Package className="w-5 h-5 text-amber-500 group-hover:text-neutral-950" />
                    </div>
                    <span className="font-medium">Order History</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full bg-red-500/10 border border-red-500/20 hover:border-red-500/50 text-red-500 p-4 rounded-xl transition-all group"
                  >
                    <div className="bg-red-500/20 p-2 rounded-lg">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
