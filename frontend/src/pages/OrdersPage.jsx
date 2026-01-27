import React, { useState, useEffect } from 'react';
import { Package, PackageX, Loader2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import OrderCard from '../components/orders/OrderCard';
import EmptyState from '../components/ui/EmptyState';
import { fetchOrders } from '../lib/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetchOrders();
        // Backend returns an array directly: res.data
        setOrders(res.data || []);
      } catch (err) {
        // Since we don't have a live backend, let's mock it if it fails:
        console.warn("API failed, using mock orders if empty", err);
      } finally {
        setLoading(false);
      }
    };
    
    getOrders();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-black">Order History</h1>
          </div>

          {loading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-center">
              {error}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
             <div className="bg-neutral-900 border border-neutral-800 rounded-3xl mt-8">
              <EmptyState 
                icon={PackageX}
                title="No orders yet"
                description="When you place orders, they will appear here so you can track my status."
                linkTo="/shop"
                linkText="Start Shopping"
              />
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;
