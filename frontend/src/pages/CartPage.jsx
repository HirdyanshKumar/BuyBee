import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import EmptyState from '../components/ui/EmptyState';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          
          <h1 className="text-4xl font-black mb-8">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              
              {/* Cart Items */}
              <div className="flex-grow order-2 lg:order-1 space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              {/* Summary Sidebar */}
              <div className="w-full lg:w-96 flex-shrink-0 order-1 lg:order-2">
                <OrderSummary />
              </div>
              
            </div>
          ) : (
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl">
              <EmptyState 
                icon={ShoppingCart}
                title="Your cart is empty"
                description="Looks like you haven't added anything to your cart yet. Let's fix that!"
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

export default CartPage;
