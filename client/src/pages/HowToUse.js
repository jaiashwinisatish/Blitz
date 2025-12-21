import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Download, MessageSquare, LayoutDashboard, UserPlus } from 'lucide-react';

const HowToUse = () => {
  const sections = [
    {
      title: 'Getting Started',
      icon: <UserPlus className="w-8 h-8" />,
      steps: [
        {
          title: 'Create an Account',
          description: 'Click on "Sign Up" in the navigation bar and fill in your details to create a free account.'
        },
        {
          title: 'Verify Your Email',
          description: 'Check your email for a verification link (in production) to activate your account.'
        },
        {
          title: 'Complete Your Profile',
          description: 'Add your information in the dashboard to personalize your experience.'
        }
      ]
    },
    {
      title: 'Exploring Projects',
      icon: <Search className="w-8 h-8" />,
      steps: [
        {
          title: 'Browse Projects',
          description: 'Visit the Projects page to see all available software solutions.'
        },
        {
          title: 'Use Filters',
          description: 'Filter projects by category (Web Development, Mobile App, AI/ML, etc.) to find what you need.'
        },
        {
          title: 'Search Functionality',
          description: 'Use the search bar to find projects by name, description, or technology.'
        },
        {
          title: 'View Details',
          description: 'Click "View Details" on any project to see full information, features, tech stack, and screenshots.'
        }
      ]
    },
    {
      title: 'Purchasing Projects',
      icon: <ShoppingCart className="w-8 h-8" />,
      steps: [
        {
          title: 'Select a Project',
          description: 'Navigate to the project details page of your chosen software.'
        },
        {
          title: 'Review Information',
          description: 'Check the features, tech stack, price, and what\'s included in the purchase.'
        },
        {
          title: 'Click Buy Now',
          description: 'Click the "Buy Now" button to proceed with the purchase.'
        },
        {
          title: 'Complete Payment',
          description: 'In production, you\'ll be redirected to a secure payment gateway. For demo purposes, purchase is instant.'
        },
        {
          title: 'Access Your Purchase',
          description: 'After successful purchase, the project will appear in your dashboard with download links.'
        }
      ]
    },
    {
      title: 'Requesting Custom Development',
      icon: <MessageSquare className="w-8 h-8" />,
      steps: [
        {
          title: 'Visit Contact Page',
          description: 'Navigate to the "Contact Us" page from the main menu.'
        },
        {
          title: 'Fill the Form',
          description: 'Provide your name, email, phone number, budget range, and detailed project requirements.'
        },
        {
          title: 'Submit Request',
          description: 'Click "Submit Request" to send your custom project inquiry to our team.'
        },
        {
          title: 'Wait for Response',
          description: 'Our team will review your request and schedule a meeting to discuss your requirements in detail.'
        },
        {
          title: 'Track Status',
          description: 'If you\'re logged in, you can track your request status in the dashboard.'
        }
      ]
    },
    {
      title: 'Using Your Dashboard',
      icon: <LayoutDashboard className="w-8 h-8" />,
      steps: [
        {
          title: 'Access Dashboard',
          description: 'Click "Dashboard" in the navigation bar after logging in.'
        },
        {
          title: 'View Purchased Projects',
          description: 'See all your purchased projects with download links and purchase dates.'
        },
        {
          title: 'Download Projects',
          description: 'Click the download button to get the source code and documentation.'
        },
        {
          title: 'View Contact History',
          description: 'Check the status of your custom project requests.'
        },
        {
          title: 'Update Profile',
          description: 'Edit your personal information and preferences.'
        }
      ]
    },
    {
      title: 'Admin Dashboard (Admin Only)',
      icon: <LayoutDashboard className="w-8 h-8" />,
      steps: [
        {
          title: 'Access Admin Panel',
          description: 'Admin users can access the admin dashboard from the navigation menu.'
        },
        {
          title: 'Manage Projects',
          description: 'Add, edit, or delete projects. Update pricing, descriptions, and features.'
        },
        {
          title: 'Manage Developers',
          description: 'Add team members, update their profiles, and manage the developer roster.'
        },
        {
          title: 'View Statistics',
          description: 'Monitor total users, projects, purchases, revenue, and other key metrics.'
        },
        {
          title: 'Handle Client Requests',
          description: 'Review and respond to custom project requests from clients.'
        },
        {
          title: 'Manage Purchases',
          description: 'View all purchases, track transactions, and manage user orders.'
        }
      ]
    },
    {
      title: 'Downloading Projects',
      icon: <Download className="w-8 h-8" />,
      steps: [
        {
          title: 'Go to Dashboard',
          description: 'Navigate to your user dashboard after logging in.'
        },
        {
          title: 'Find Your Purchase',
          description: 'Locate the project you want to download in your purchased projects list.'
        },
        {
          title: 'Click Download',
          description: 'Click the download button to get the complete source code.'
        },
        {
          title: 'Extract Files',
          description: 'Unzip the downloaded file to access all project files and documentation.'
        },
        {
          title: 'Follow Documentation',
          description: 'Read the included README and documentation to set up and run the project.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            How To Use Blitzs Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A complete guide to help you navigate and use our platform effectively
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {section.icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-6">
                {section.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {stepIndex + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Our support team is here to assist you with any questions or issues.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HowToUse;
