import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import FeaturedProducts from '../components/home/FeaturedProducts';
import FeatureBar from '../components/home/FeatureBar';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <CategoryShowcase />
        <FeaturedProducts />
        <FeatureBar />
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
