import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Mail, CheckCircle, ExternalLink } from 'lucide-react';
import { getProject, createPurchase } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await getProject(id);
      setProject(response.data);
    } catch (error) {
      toast.error('Failed to load project');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase');
      navigate('/login');
      return;
    }

    setPurchasing(true);
    try {
      await createPurchase(project._id);
      toast.success('Purchase successful! Check your dashboard for download link.');
      navigate('/user/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Purchase failed');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                  {project.category}
                </span>
                <h1 className="text-4xl font-bold mt-4 mb-4 text-gray-900 dark:text-white">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {project.shortDescription}
                </p>
              </div>

              {/* Main Image */}
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Description */}
              <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  About This Project
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.techStack?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Images */}
              {project.demoImages && project.demoImages.length > 0 && (
                <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Screenshots
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.demoImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Demo ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Price</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${project.price}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={handlePurchase}
                    disabled={purchasing}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{purchasing ? 'Processing...' : 'Buy Now'}</span>
                  </button>

                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contact Team</span>
                  </Link>
                </div>

                <div className="border-t dark:border-gray-700 pt-6">
                  <h3 className="font-bold mb-4 text-gray-900 dark:text-white">
                    What's Included
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Full source code</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Documentation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Lifetime updates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Technical support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Commercial license</span>
                    </li>
                  </ul>
                </div>

                {project.purchaseCount > 0 && (
                  <div className="mt-6 pt-6 border-t dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {project.purchaseCount}
                      </span>{' '}
                      developers have purchased this project
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
