import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Package, User, Mail, Phone, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyPurchases } from '../utils/api';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('purchases');

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await getMyPurchases();
      setPurchases(response.data);
    } catch (error) {
      toast.error('Failed to load purchases');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'purchases', label: 'My Purchases', icon: <Package className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.fullName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your purchases and profile
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'purchases' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your Purchased Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {purchases.length} {purchases.length === 1 ? 'project' : 'projects'} purchased
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-xl h-64 animate-pulse"></div>
                ))}
              </div>
            ) : purchases.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No purchases yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Browse our projects and make your first purchase
                </p>
                <a
                  href="/projects"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Projects
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchases.map((purchase) => (
                  <motion.div
                    key={purchase._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={purchase.project?.image}
                        alt={purchase.project?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {purchase.project?.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                          {purchase.project?.category}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${purchase.amount}
                        </span>
                      </div>
                      <a
                        href={purchase.downloadLink || purchase.project?.downloadLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Profile Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <User className="w-6 h-6 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {user?.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {user?.phone && (
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Package className="w-6 h-6 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Purchases</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {purchases.length} {purchases.length === 1 ? 'project' : 'projects'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
