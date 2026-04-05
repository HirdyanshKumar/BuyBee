import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Shirt, Home, Dumbbell, ArrowRight } from 'lucide-react';
import { mockCategories } from '../../data/mockData';

const iconMap = {
  Cpu: <Cpu className="w-8 h-8" />,
  Shirt: <Shirt className="w-8 h-8" />,
  Home: <Home className="w-8 h-8" />,
  Dumbbell: <Dumbbell className="w-8 h-8" />
};

const CategoryShowcase = () => {
  return (
    <section id="categories" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Shop by Category</h2>
            <p className="text-neutral-400 max-w-xl">
              Browse our meticulously categorized selection to find exactly what you're looking for.
            </p>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-amber-500 font-medium hover:text-amber-400 transition-colors">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCategories.map((category, index) => (
            <Link 
              to={`/shop?category=${category.slug}`} 
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-20 h-20 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-amber-500 group-hover:border-amber-500/50 group-hover:scale-110 transition-all duration-300 mb-6 relative z-10 shadow-[0_0_0_0_rgba(245,158,11,0)] group-hover:shadow-[0_0_20px_0_rgba(245,158,11,0.2)]">
                {iconMap[category.icon]}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{category.name}</h3>
              <p className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors relative z-10">
                Explore Collection
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
