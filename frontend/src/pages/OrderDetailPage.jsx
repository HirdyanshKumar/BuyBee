import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, PackageCheck, Loader2, MapPin } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StatusBadge from '../components/orders/StatusBadge';
import { fetchOrderById } from '../lib/api';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const justCreated = location.state?.justCreated;
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await fetchOrderById(orderId);
        setOrder(res.data);
      } catch (err) {
        console.warn("API failed, using mock data", err);
        // Fallback mock order if backend isn't ready
        setOrder({
          id: orderId,
          created_at: new Date().toISOString(),
          status: 'PENDING',
          total_amount: 149.99,
          items: [
             { id: '1', product_name: 'Premium Headphones', price: 149.99, quantity: 1 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [orderId]);

  if (loading) {
     return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
     );
  }

  const formattedDate = new Date(order.created_at).toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <Link to="/orders" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-500 font-medium mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Orders
          </Link>

          {justCreated && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-6 rounded-2xl mb-8 flex flex-col items-center justify-center text-center animate-slide-up">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <PackageCheck className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p>Thank you for shopping with BuyBee. Your order has been placed successfully.</p>
            </div>
          )}
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-neutral-800 bg-neutral-800/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div>
                 <h1 className="text-2xl font-bold text-white mb-2">Order #{order.id}</h1>
                 <p className="text-neutral-400 text-sm">Placed on {formattedDate}</p>
               </div>
               <div className="flex gap-4 items-center">
                 <StatusBadge status={order.status} />
               </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-12">
               
               {/* Items List */}
               <div className="flex-grow">
                 <h3 className="text-lg font-bold text-white mb-6">Items Ordered</h3>
                 <div className="space-y-6">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex gap-4 py-4 border-b border-neutral-800/50 last:border-0 last:pb-0">
                         <div className="w-20 h-20 bg-neutral-950 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-3xl font-black text-neutral-800">{item.product_name?.charAt(0)}</span>
                         </div>
                         <div className="flex-grow flex flex-col sm:flex-row sm:justify-between pt-1">
                            <div>
                               <h4 className="font-bold text-white mb-1">{item.product_name}</h4>
                               <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="font-bold text-white mt-2 sm:mt-0 text-right">
                               <div className="text-xs text-neutral-500 font-normal mb-1">${parseFloat(item.price).toFixed(2)} each</div>
                               ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
               </div>
               
               {/* Summary Sidebar */}
               <div className="w-full md:w-72 flex-shrink-0 space-y-8">
                  <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
                     <h3 className="font-bold text-white mb-4">Total Summary</h3>
                     <div className="space-y-3 text-sm border-b border-neutral-800 pb-4 mb-4">
                        <div className="flex justify-between text-neutral-400">
                           <span>Subtotal</span>
                           <span>${parseFloat(order.total_amount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                           <span>Shipping</span>
                           <span>$0.00</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                           <span>Tax</span>
                           <span>$0.00</span>
                        </div>
                     </div>
                     <div className="flex justify-between font-bold text-lg">
                        <span className="text-white">Total</span>
                        <span className="text-amber-500">${parseFloat(order.total_amount).toFixed(2)}</span>
                     </div>
                  </div>

                  <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
                     <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-amber-500" /> Shipping To:
                     </h3>
                     <p className="text-sm text-neutral-400 leading-relaxed">
                        John Doe<br/>
                        123 Hive Street, Suite 400<br/>
                        San Francisco, CA 94105<br/>
                        United States
                     </p>
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

export default OrderDetailPage;
