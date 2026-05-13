import React, { useState, useEffect } from 'react';
import { Package, Users, DollarSign, LayoutDashboard, Search, Trash2, Image as ImageIcon, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'settings'
  const [settings, setSettings] = useState({
    logoImage: '',
    heroImage: '',
    detailsImage: ''
  });

  useEffect(() => {
    // Load orders
    const savedOrders = JSON.parse(localStorage.getItem('update_sell_orders') || '[]');
    setOrders(savedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

    // Load settings
    const savedSettings = JSON.parse(localStorage.getItem('update_sell_settings') || '{}');
    if (savedSettings.heroImage || savedSettings.detailsImage || savedSettings.logoImage) {
      setSettings({
        logoImage: savedSettings.logoImage || '',
        heroImage: savedSettings.heroImage || '',
        detailsImage: savedSettings.detailsImage || ''
      });
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই অর্ডারটি ডিলিট করতে চান?')) {
      const updatedOrders = orders.filter(order => order.id !== id);
      localStorage.setItem('update_sell_orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      toast.success('অর্ডার ডিলিট করা হয়েছে');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === id) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    localStorage.setItem('update_sell_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    toast.success('স্ট্যাটাস আপডেট করা হয়েছে');
  };

  const handleSettingChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Limit file size to avoid local storage quota errors (approx 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('ছবিটি খুব বড়! দয়া করে ২MB এর চেয়ে ছোট ছবি আপলোড করুন।');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({
          ...settings,
          [fieldName]: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => {
    localStorage.setItem('update_sell_settings', JSON.stringify(settings));
    toast.success('সেটিংস সেভ করা হয়েছে!');
  };

  const filteredOrders = orders.filter(order => 
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.mobile.includes(searchTerm)
  );

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalItemsSold = orders.reduce((sum, order) => sum + order.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="bg-primary text-white p-1.5 rounded-lg text-sm">US</span>
            Admin
          </h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <LayoutDashboard className="w-5 h-5" />
                ড্যাশবোর্ড
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <ImageIcon className="w-5 h-5" />
                ইমেজ সেটিংস
              </button>
            </li>
            <li className="pt-4 mt-4 border-t border-slate-800">
              <a href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
                <Package className="w-5 h-5" />
                মেইন ওয়েবসাইট
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {activeTab === 'orders' ? 'ওভারভিউ' : 'ওয়েবসাইট ইমেজ সেটিংস'}
              </h2>
              <p className="text-slate-600 mt-1">
                {activeTab === 'orders' ? 'আপনার সেলের বর্তমান অবস্থা' : 'ল্যান্ডিং পেজের ছবিগুলো পরিবর্তন করুন'}
              </p>
            </div>
          </header>

          {activeTab === 'orders' ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                  <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">মোট অর্ডার</p>
                    <h3 className="text-2xl font-bold text-slate-900">{orders.length}</h3>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                  <div className="p-4 bg-green-100 text-green-600 rounded-xl">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">প্রোডাক্ট সেল</p>
                    <h3 className="text-2xl font-bold text-slate-900">{totalItemsSold} পিস</h3>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                  <div className="p-4 bg-primary/20 text-primary rounded-xl">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">মোট আয়</p>
                    <h3 className="text-2xl font-bold text-slate-900">৳{totalRevenue}</h3>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                  <h3 className="text-xl font-bold text-slate-900">অর্ডার লিস্ট</h3>
                  <div className="relative">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-64"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                        <th className="p-4 font-medium">কাস্টমার</th>
                        <th className="p-4 font-medium">ঠিকানা</th>
                        <th className="p-4 font-medium">অর্ডার ডিটেইলস</th>
                        <th className="p-4 font-medium">স্ট্যাটাস</th>
                        <th className="p-4 font-medium text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-slate-500">
                            কোনো অর্ডার পাওয়া যায়নি।
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-slate-900">{order.name}</div>
                              <div className="text-sm text-slate-500">{order.mobile}</div>
                              <div className="text-xs text-slate-400 mt-1">
                                {new Date(order.createdAt).toLocaleDateString('bn-BD')} {new Date(order.createdAt).toLocaleTimeString('bn-BD')}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-700 max-w-[200px]">{order.address}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-sm font-medium text-slate-900">{order.quantity} পিস</div>
                              <div className="text-sm font-bold text-primary">৳{order.total}</div>
                            </td>
                            <td className="p-4">
                              <select 
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className={`text-sm font-medium rounded-full px-3 py-1 border-0 focus:ring-2 outline-none
                                  ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                  ${order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : ''}
                                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                                  ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                                `}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => handleDelete(order.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="ডিলিট করুন"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Settings Tab */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-3xl">
              <div className="space-y-6">
                
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">ওয়েবসাইট লোগো</label>
                  <p className="text-sm text-slate-500 mb-3">আপনার ব্র্যান্ডের লোগো আপলোড করুন (সর্বোচ্চ ২MB)।</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logoImage')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  {settings.logoImage && (
                    <div className="mt-4 border rounded-xl overflow-hidden h-20 w-20 bg-slate-100 flex items-center justify-center p-2">
                      <img src={settings.logoImage} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-900 mb-2">হিরো সেকশনের ছবি (ব্যানার)</label>
                  <p className="text-sm text-slate-500 mb-3">আপনার কম্পিউটার থেকে ব্যানার ইমেজ আপলোড করুন (সর্বোচ্চ ২MB)।</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'heroImage')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  {settings.heroImage && (
                    <div className="mt-4 border rounded-xl overflow-hidden h-40">
                      <img src={settings.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-900 mb-2">প্রোডাক্ট ডিটেইলস ছবি</label>
                  <p className="text-sm text-slate-500 mb-3">বক্সের ভেতরের ছবি বা গ্যালারি ইমেজ আপলোড করুন (সর্বোচ্চ ২MB)।</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'detailsImage')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  {settings.detailsImage && (
                    <div className="mt-4 border rounded-xl overflow-hidden h-40 w-40">
                      <img src={settings.detailsImage} alt="Details Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="pt-8">
                  <button
                    onClick={saveSettings}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    সেটিংস সেভ করুন
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
