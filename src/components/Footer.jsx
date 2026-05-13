import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="font-bold text-2xl text-white mb-4">Update Sell</div>
        <p className="mb-6 max-w-md mx-auto text-slate-400">
          বাচ্চাদের জন্য সেরা কোয়ালিটির খেলনা এবং এডুকেশনাল সামগ্রী পৌঁছে দেওয়াই আমাদের লক্ষ্য।
        </p>
        <div className="border-t border-slate-800 pt-8 mt-8 text-sm">
          &copy; {new Date().getFullYear()} Update Sell. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
