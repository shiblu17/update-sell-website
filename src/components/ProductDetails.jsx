import React, { useState, useEffect } from 'react';
import { Palette, ShieldCheck, Box, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    name: '১৪৫ পিসের বিশাল কালেকশন',
    description: 'কালার পেন্সিল, ক্রেয়ন, ওয়াটার কালার, মার্কার এবং আরও অনেক কিছু।',
    icon: Palette,
  },
  {
    name: 'বহনযোগ্য মেটাল বক্স',
    description: 'সুন্দর ইউনিকর্ন ডিজাইনের প্রিমিয়াম অ্যালুমিনিয়াম কেস, যা সহজে বহনযোগ্য।',
    icon: Box,
  },
  {
    name: 'পরিবেশবান্ধব ও নিরাপদ',
    description: 'বাচ্চাদের ব্যবহারের জন্য ১০০% নিরাপদ এবং নন-টক্সিক ম্যাটেরিয়াল দিয়ে তৈরি।',
    icon: ShieldCheck,
  },
  {
    name: 'সৃজনশীলতা বিকাশ',
    description: 'বাচ্চাদের স্ক্রিন থেকে দূরে রেখে ছবি আঁকায় আগ্রহী করে তুলবে।',
    icon: Sparkles,
  },
];

const ProductDetails = () => {
  const [detailsImage, setDetailsImage] = useState('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop');

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('update_sell_settings') || '{}');
    if (savedSettings.detailsImage) {
      setDetailsImage(savedSettings.detailsImage);
    }
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            বক্সের ভেতরে কী কী থাকছে?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            সম্পূর্ণ একটি আর্ট স্টুডিও এখন একটি মাত্র বক্সে! বাচ্চাদের আর্ট করার জন্য প্রয়োজনীয় সবকিছুই আছে এই প্রিমিয়াম সেটে।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Using placeholder, original image 687724546_122098663641301699_8956106686770736307_n.jpg */}
            <img 
              src={detailsImage} 
              alt="Inside the Box" 
              className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <dl className="space-y-10">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-xl leading-6 font-bold text-slate-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-slate-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
