import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProductDetails from '../components/ProductDetails';
import CheckoutSection from '../components/CheckoutSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ProductDetails />
        <CheckoutSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
