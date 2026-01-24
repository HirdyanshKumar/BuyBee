import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, MapPin, Loader2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import OrderSummary from '../components/cart/OrderSummary';
import { useCart } from '../context/CartContext';
import { createOrder } from '../lib/api';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const items = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

      // Mock backend usually requires these fields matching the API validation
      const res = await createOrder({ items });
      const orderId = res.data.id || 'mock-id-' + Date.now();
      
      clearCart();
      navigate(`/orders/${orderId}`, { state: { justCreated: true } });
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <h1 className="text-4xl font-black mb-8 text-center md:text-left">Secure Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            <div className="flex-grow space-y-8 lg:w-2/3">
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl">
                  {error}
                </div>
              )}

              {/* Shipping Form */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-neutral-800 pb-4">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  Shipping Address
                </h2>
                
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Full Name</label>
                    <input 
                      type="text" required name="fullName" value={shipping.fullName} onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Address</label>
                    <input 
                      type="text" required name="address" value={shipping.address} onChange={handleChange}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-neutral-400 mb-1">City</label>
                      <input 
                        type="text" required name="city" value={shipping.city} onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-1">Postal Code</label>
                      <input 
                        type="text" required name="postalCode" value={shipping.postalCode} onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-1">Country</label>
                      <input 
                        type="text" required name="country" value={shipping.country} onChange={handleChange}
                        className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Method Stub */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-neutral-800 pb-4">
                  <CreditCard className="w-5 h-5 text-amber-500" />
                  Payment Method
                </h2>
                <div className="border border-amber-500/50 bg-amber-500/5 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-neutral-950" />
                    </div>
                    <span className="font-medium text-white">Pay on Delivery (Simulated)</span>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="lg:w-1/3 flex-shrink-0">
              <OrderSummary isCheckout={true} />
              
              <button 
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full mt-6 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-950 font-bold py-5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 text-lg"
              >
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm & Place Order'}
              </button>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
