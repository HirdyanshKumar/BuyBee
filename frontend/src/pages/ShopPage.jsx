import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, PackageX } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/shop/ProductCard';
import FilterSidebar from '../components/shop/FilterSidebar';
import EmptyState from '../components/ui/EmptyState';
import { mockProducts } from '../data/mockData';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // In real app, fetch from API
  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category.slug === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Filter by price
    result = result.filter(p => p.price <= priceRange[1]);

    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, priceRange]);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Page Header */}
        <div className="bg-neutral-900 border-b border-neutral-800 mb-8 py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">The Collection</h1>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Explore our full range of premium lifestyle products, handpicked for quality and design.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            <FilterSidebar 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              isMobileOpen={isMobileFilterOpen}
              setIsMobileOpen={setIsMobileFilterOpen}
            />

            <div className="flex-grow flex flex-col">
              
              {/* Search and Action Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 appearance-none min-w-[150px]">
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <button 
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden bg-neutral-900 border border-neutral-800 text-white rounded-xl px-4 py-3 flex items-center gap-2"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <>
                  <div className="mb-6 text-sm text-neutral-400 font-medium tracking-wide">
                    Showing <span className="text-white">{filteredProducts.length}</span> results
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex-grow flex items-center justify-center bg-neutral-900/50 rounded-2xl border border-neutral-800/50">
                  <EmptyState 
                    icon={PackageX}
                    title="No Products Found"
                    description="We couldn't find any products matching your current filters. Try adjusting your search criteria."
                    linkTo={null}
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
