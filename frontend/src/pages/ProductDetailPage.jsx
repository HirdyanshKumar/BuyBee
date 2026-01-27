import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, ShieldQuestion, ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import QuantitySelector from '../components/product/QuantitySelector';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    // In real app, fetch from API: fetchProductBySlug(slug)
    const foundProduct = mockProducts.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-950">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-24 pb-16">
          <div className="text-center animate-pulse text-amber-500">Loading product...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-amber-500 font-medium mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Image Gallery Column */}
            <div className="space-y-4">
              <div className="w-full aspect-square bg-neutral-900 border border-neutral-800 rounded-3xl relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-950"></div>
                {/* Simulated product visual placeholder */}
                <div className="absolute inset-x-0 bottom-0 top-[20%] flex flex-col items-center justify-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700">
                  <span className="text-[200px] font-black leading-none">{product.name.charAt(0)}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="aspect-square bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden relative group cursor-pointer hover:border-amber-500 transition-colors">
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-tr from-neutral-800 to-neutral-700"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Column */}
            <div className="flex flex-col pt-4">
              <div className="mb-2">
                <span className="text-sm tracking-widest font-bold text-amber-500 uppercase">{product.category.name}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-white mb-8">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="text-neutral-400 text-lg leading-relaxed mb-8 pb-8 border-b border-neutral-800">
                {product.description}
              </div>
              
              {product.stock > 0 ? (
                <>
                  <div className="mb-8">
                    <p className="text-sm font-medium text-green-500 bg-green-500/10 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 border border-green-500/20 mb-4">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      In Stock - Ready to ship ({product.stock} available)
                    </p>
                    <QuantitySelector 
                      quantity={quantity} 
                      setQuantity={setQuantity} 
                      maxStock={product.stock}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button 
                      onClick={() => addToCart(product, quantity)}
                      className="flex-grow bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </button>
                    <button className="flex-none bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white w-14 h-14 rounded-xl flex items-center justify-center transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                    <button className="flex-none bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white w-14 h-14 rounded-xl flex items-center justify-center transition-colors">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 font-medium flex items-center justify-center mb-8">
                  Currently Out of Stock
                </div>
              )}

              {/* Service Badges */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mt-auto">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-neutral-300">
                    <ShieldQuestion className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">Genuine Product Guarantee</h4>
                      <p className="text-sm text-neutral-500 mt-1">Every item is authenticated and strictly inspected before shipping.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Related Products Section */}
          <div className="mt-32 border-t border-neutral-900 pt-16">
            <h2 className="text-3xl font-bold mb-8 items-center flex gap-4">
              Similar Items
            </h2>
            <div className="overflow-x-auto pb-8 snap-x">
              <div className="flex gap-6 min-w-max px-2">
                {mockProducts.filter(p => p.category.slug === product.category.slug && p.id !== product.id).slice(0, 4).map(related => (
                  <Link to={`/product/${related.slug}`} key={related.id} className="w-72 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden snap-start hover:border-amber-500/50 transition-colors group p-4 flex flex-col gap-4">
                     <span className="text-xs text-amber-500 font-medium">{related.category.name}</span>
                     <h3 className="font-bold text-lg group-hover:text-amber-500 text-white truncate">{related.name}</h3>
                     <span className="font-black text-xl">${related.price.toFixed(2)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
