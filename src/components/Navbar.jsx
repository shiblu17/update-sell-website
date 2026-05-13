import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [logoImage, setLogoImage] = React.useState('');

  React.useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('update_sell_settings') || '{}');
    if (savedSettings.logoImage) {
      setLogoImage(savedSettings.logoImage);
    }
  }, []);

  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            {logoImage ? (
              <img src={logoImage} alt="Update Sell Logo" className="h-10 w-auto" />
            ) : (
              <span className="font-bold text-2xl text-primary flex items-center gap-2">
                <span className="bg-primary text-white p-1 rounded-lg">US</span>
                Update Sell
              </span>
            )}
          </div>
          <div>
            <button 
              onClick={scrollToCheckout}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-md shadow-primary/30"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>অর্ডার করুন</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
