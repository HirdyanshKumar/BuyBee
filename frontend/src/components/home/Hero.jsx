import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background gradients and patterns */}
      <div className="absolute inset-0 honeycomb-pattern opacity-20 z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[120px] z-0 pointer-events-none"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-[20%] left-[10%] opacity-30 animate-float delay-100 hidden md:block">
        <Hexagon className="w-16 h-16 text-amber-500" />
      </div>
      <div className="absolute bottom-[20%] right-[10%] opacity-30 animate-float delay-300 hidden md:block">
        <Hexagon className="w-24 h-24 text-amber-400" />
      </div>
      <div className="absolute top-[30%] right-[20%] opacity-20 animate-float delay-200 hidden lg:block">
        <Hexagon className="w-12 h-12 text-white" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-sm font-medium text-neutral-300">New premium collection dropped</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight animate-slide-up delay-100 uppercase">
          Discover the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Gold Standard
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
          Curated lifestyle products that elevate your everyday experience. 
          Uncompromising quality, exceptional design, and sustainable sourcing.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-300">
          <Link 
            to="/shop" 
            className="group w-full md:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-amber-500/20"
          >
            Shop Collection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="#categories" 
            className="w-full md:w-auto flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white border border-neutral-800 hover:border-amber-500 hover:text-amber-500 glass transition-all"
          >
            Explore Categories
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
