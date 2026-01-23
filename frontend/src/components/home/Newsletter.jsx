import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-neutral-900">
      
      {/* Background patterns */}
      <div className="absolute inset-0 honeycomb-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle glow inside card */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 blur-[50px]"></div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Stay in the <span className="text-amber-500">Buzz</span>
          </h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto md:text-lg">
            Subscribe to our newsletter and get 15% off your first order. 
            Plus, gain access to exclusive drops and insider updates.
          </p>
          
          <form className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-grow w-full bg-neutral-900 border border-neutral-800 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-4 rounded-xl whitespace-nowrap transition-colors"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-neutral-600 mt-6 font-medium tracking-wide text-center">
            WE PROMISE NOT TO SPAM YOU. UNSUBSCRIBE ANYTIME.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
