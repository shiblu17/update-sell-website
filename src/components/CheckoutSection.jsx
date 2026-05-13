import React, { useState } from 'react';
import { Minus, Plus, Truck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: ''
  });
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [detailsImage, setDetailsImage] = useState('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop');

  React.useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('update_sell_settings') || '{}');
    if (savedSettings.detailsImage) {
      setDetailsImage(savedSettings.detailsImage);
    }
  }, []);

  const pricePerUnit = 1250; // Mock price
  const deliveryCharge = 100;
  const total = (pricePerUnit * quantity) + deliveryCharge;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and saving to LocalStorage
    setTimeout(() => {
      const newOrder = {
        id: Date.now().toString(),
        ...formData,
        quantity,
        total,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      const existingOrders = JSON.parse(localStorage.getItem('update_sell_orders') || '[]');
      localStorage.setItem('update_sell_orders', JSON.stringify([...existingOrders, newOrder]));

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success('আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!');
      
      // Reset after success
      setFormData({ name: '', mobile: '', address: '' });
      setQuantity(1);
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    }, 1500);
  };

  if (isSuccess) {
    return (
      <section id="checkout" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 flex flex-col items-center">
            <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">ধন্যবাদ!</h2>
            <p className="text-xl text-slate-600 mb-8">
              আপনার অর্ডারটি সফলভাবে রিসিভ করা হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি আপনাকে কল করে অর্ডারটি কনফার্ম করবেন।
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors"
            >
              আরও একটি অর্ডার করুন
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className="py-24 bg-slate-50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">অর্ডার কনফার্ম করুন</h2>
          <p className="mt-4 text-lg text-slate-600">নিচের ফর্মটি পূরণ করে আপনার অর্ডার কনফার্ম করুন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">আপনার নাম</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="সম্পূর্ণ নাম লিখুন"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-2">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="১১ ডিজিটের মোবাইল নম্বর"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">সম্পূর্ণ ঠিকানা</label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="বাসা নং, রোড নং, এলাকা, থানা, জেলা"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-md text-xl font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'প্রসেস হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">অর্ডার সামারি</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={detailsImage} 
                  alt="Product" 
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900">ইউনিকর্ন আর্ট সেট (১৪৫ পিস)</h4>
                  <p className="text-primary font-bold mt-1">৳{pricePerUnit}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                <span className="text-slate-600 font-medium">পরিমাণ নির্বাচন করুন</span>
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                  <button 
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 rounded-full hover:bg-slate-200 text-slate-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-slate-900 w-6 text-center">{quantity}</span>
                  <button 
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 rounded-full hover:bg-slate-200 text-slate-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>সাবটোটাল</span>
                  <span className="font-medium">৳{pricePerUnit * quantity}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-medium">৳{deliveryCharge}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 pt-6 border-t border-slate-100">
                <span className="text-xl font-bold text-slate-900">সর্বমোট</span>
                <span className="text-2xl font-extrabold text-primary">৳{total}</span>
              </div>

              <div className="bg-green-50 p-4 rounded-xl flex items-start gap-3 border border-green-100">
                <Truck className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-green-800">ক্যাশ অন ডেলিভারি</h5>
                  <p className="text-sm text-green-700 mt-1">প্রোডাক্ট হাতে পেয়ে পেমেন্ট করার সুবিধা!</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
