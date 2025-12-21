import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Package, DollarSign, MessageSquare, TrendingUp, ShoppingCart } from 'lucide-react';
import { getStats } from '../../utils/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getStats();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Projects',
      value: stats?.totalProjects || 0,
      icon: <Package className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Purchases',
      value: stats?.totalPurchases || 0,
      icon: <ShoppingCart className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue || 0}`,
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Pending Requests',
      value: stats?.pendingRequests || 0,
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600'
    }
  ];

  const quickLinks = [
    { title: 'Manage Projects', path: '/admin/projects', icon: <Package className="w-6 h-6" /> },
    { title: 'Manage Developers', path: '/admin/developers', icon: <Users className="w-6 h-6" /> },
    { title: 'Client Requests', path: '/admin/requests', icon: <MessageSquare className="w-6 h-6" /> },
    { title: 'View Purchases', path: '/admin/purchases', icon: <ShoppingCart className="w-6 h-6" /> }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your platform and monitor performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className={`text-3xl font-bold ${stat.textColor} dark:text-white`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {link.icon}
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {link.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Purchases */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Purchases
            </h2>
            {stats?.recentPurchases && stats.recentPurchases.length > 0 ? (
              <div className="space-y-4">
                {stats.recentPurchases.map((purchase) => (
                  <div
                    key={purchase._id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {purchase.project?.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {purchase.user?.fullName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 dark:text-green-400">
                        ${purchase.project?.price}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No recent purchases</p>
            )}
          </motion.div>

          {/* Top Projects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Top Selling Projects
            </h2>
            {stats?.topProjects && stats.topProjects.length > 0 ? (
              <div className="space-y-4">
                {stats.topProjects.map((project, index) => (
                  <div
                    key={project._id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {project.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {project.purchaseCount} sales
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      ${project.price}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No sales data available</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
