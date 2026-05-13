import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const HeroSection = () => {
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop');

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('update_sell_settings') || '{}');
    if (savedSettings.heroImage) {
      setHeroImage(savedSettings.heroImage);
    }
  }, []);

  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Star className="w-4 h-4 fill-primary" />
              <span>বেস্ট সেলিং কিডস আইটেম</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              আপনার সোনামণির মুখেও <span className="text-primary relative whitespace-nowrap">ফুটবে হাসি!
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="currentColor" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              ১৪৫ পিসের প্রিমিয়াম ইউনিকর্ন আর্ট সেট কালেকশন—বাচ্চাদের সৃজনশীলতা বিকাশে সেরা উপহার। আজই সংগ্রহ করুন আপনার সোনামণির জন্য।
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToCheckout}
                className="group inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary text-white font-bold text-lg rounded-full hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>এখনই অর্ডার করুন</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>স্টক সীমিত</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <span>সারা দেশে হোম ডেলিভারি</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            <img 
              src={heroImage} 
              alt="Premium Art Set" 
              className="rounded-3xl shadow-2xl object-cover w-full h-[400px] sm:h-[500px] border-4 border-white"
            />
            {/* Note: I am using an Unsplash placeholder for the hero image. Once the user uploads 683431101_122093038413301699_2010721733300828198_n.jpg, it should be replaced here. */}
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-6 -right-6 bg-yellow-400 text-slate-900 font-bold px-6 py-4 rounded-full shadow-lg transform rotate-12 border-4 border-white"
            >
              <div className="text-xl">১৪৫</div>
              <div className="text-sm">পিস</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
