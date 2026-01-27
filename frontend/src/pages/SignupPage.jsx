import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hexagon, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { signupUser } from '../lib/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Auto-redirect to login after successful registration
      navigate('/login');
      
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4 pb-20 pt-10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Hexagon className="w-10 h-10 text-amber-500 fill-amber-500/20" />
            <span className="text-2xl font-bold tracking-tight text-white">Buy<span className="text-amber-500">Bee</span></span>
          </Link>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">Create Account</h1>
          <p className="text-neutral-400 text-center mb-8">
            Join BuyBee to start your premium shopping journey.
          </p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-neutral-600"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-neutral-600"
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-neutral-600"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-neutral-600"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center gap-2 text-neutral-950 font-bold py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6 shadow-lg shadow-amber-500/20"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-500 hover:text-amber-400 font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
