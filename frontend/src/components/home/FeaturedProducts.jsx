import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { fetchProducts } from '../../lib/api'; // In real app, we'd use this

const FeaturedProducts = () => {
  const [products, setProducts] = useState(mockProducts.slice(0, 8));
  const { addToCart } = useCart();

  // In a real implementation:
  // useEffect(() => {
  //   fetchProducts().then(res => setProducts(res.data.slice(0,8))).catch(console.error);
  // }, []);

  return (
    <section className="py-24 bg-neutral-900/30">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-2 block">Curated Selection</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Products</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Our most popular items, chosen for their exceptional quality and striking design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300">
              
              {/* Image Placeholder */}
              <Link to={`/product/${product.slug}`} className="relative aspect-square bg-neutral-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-9xl font-black">{product.name.charAt(0)}</span>
                </div>
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button 
                    onClick={(e) => { e.preventDefault(); addToCart(product); }}
                    className="translate-y-4 group-hover:translate-y-0 text-sm font-semibold bg-white text-neutral-950 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-amber-500 transition-all duration-300"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Quick Add
                  </button>
                </div>
              </Link>
              
              {/* Product Info */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs text-amber-500 font-medium mb-2">{product.category.name}</span>
                <Link to={`/product/${product.slug}`} className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-amber-400 transition-colors">
                  {product.name}
                </Link>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-800/50">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-neutral-500 text-sm">{product.stock} in stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-neutral-700 hover:border-amber-500 hover:text-amber-500 font-semibold transition-all"
          >
            Load More Products
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
