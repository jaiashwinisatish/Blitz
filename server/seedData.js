const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Developer = require('./models/Developer');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Developer.deleteMany();

    // Create admin user
    const admin = await User.create({
      fullName: 'Admin Blitzs',
      email: 'admin@blitzs.dev',
      password: 'admin123',
      role: 'admin',
      phone: '+1234567890'
    });

    // Create regular user
    const user = await User.create({
      fullName: 'John Doe',
      email: 'user@blitzs.dev',
      password: 'user123',
      role: 'user',
      phone: '+1234567891'
    });

    console.log('✅ Users created');

    // Create developers
    const developers = await Developer.create([
      {
        name: 'Alex Johnson',
        role: 'Full Stack Developer',
        expertise: ['React', 'Node.js', 'MongoDB', 'AWS'],
        bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications.',
        email: 'alex@blitzs.dev',
        github: 'https://github.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        yearsOfExperience: 5,
        image: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff&size=200'
      },
      {
        name: 'Sarah Chen',
        role: 'AI/ML Engineer',
        expertise: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
        bio: 'AI specialist focused on deep learning and computer vision applications.',
        email: 'sarah@blitzs.dev',
        github: 'https://github.com/sarahchen',
        linkedin: 'https://linkedin.com/in/sarahchen',
        yearsOfExperience: 4,
        image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=ec4899&color=fff&size=200'
      },
      {
        name: 'Marcus Williams',
        role: 'Mobile Developer',
        expertise: ['React Native', 'Flutter', 'iOS', 'Android'],
        bio: 'Mobile development expert creating beautiful cross-platform applications.',
        email: 'marcus@blitzs.dev',
        github: 'https://github.com/marcuswilliams',
        linkedin: 'https://linkedin.com/in/marcuswilliams',
        yearsOfExperience: 6,
        image: 'https://ui-avatars.com/api/?name=Marcus+Williams&background=10b981&color=fff&size=200'
      },
      {
        name: 'Emily Rodriguez',
        role: 'Blockchain Developer',
        expertise: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
        bio: 'Blockchain enthusiast building decentralized applications and smart contracts.',
        email: 'emily@blitzs.dev',
        github: 'https://github.com/emilyrodriguez',
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
        yearsOfExperience: 3,
        image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=f59e0b&color=fff&size=200'
      }
    ]);

    console.log('✅ Developers created');

    // Create projects
    const projects = await Project.create([
      {
        title: 'E-Commerce Platform Pro',
        shortDescription: 'Complete e-commerce solution with admin panel, payment integration, and inventory management.',
        fullDescription: 'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, payment gateway integration, order tracking, admin dashboard, and analytics. Perfect for businesses looking to establish their online presence.',
        category: 'Web Development',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Tailwind CSS'],
        features: [
          'User authentication and authorization',
          'Product catalog with search and filters',
          'Shopping cart and checkout',
          'Payment gateway integration (Stripe)',
          'Order management and tracking',
          'Admin dashboard with analytics',
          'Inventory management',
          'Email notifications',
          'Responsive design'
        ],
        price: 299,
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        demoImages: [
          'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
        ],
        downloadLink: 'https://github.com/blitzs/ecommerce-pro',
        featured: true,
        createdBy: admin._id
      },
      {
        title: 'AI Chatbot Assistant',
        shortDescription: 'Intelligent chatbot powered by GPT-4 with custom training and integration capabilities.',
        fullDescription: 'An advanced AI chatbot solution that can be integrated into any website or application. Uses GPT-4 for natural language processing and can be trained on custom data. Includes conversation history, multi-language support, and analytics dashboard.',
        category: 'AI/ML',
        techStack: ['Python', 'OpenAI API', 'FastAPI', 'React', 'PostgreSQL', 'Redis'],
        features: [
          'GPT-4 powered conversations',
          'Custom training on your data',
          'Multi-language support',
          'Conversation history and analytics',
          'Easy integration via API or widget',
          'Admin dashboard for monitoring',
          'Rate limiting and security',
          'Webhook support'
        ],
        price: 499,
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
        demoImages: [
          'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
          'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'
        ],
        downloadLink: 'https://github.com/blitzs/ai-chatbot',
        featured: true,
        createdBy: admin._id
      },
      {
        title: 'Task Management System',
        shortDescription: 'Collaborative project management tool with kanban boards, time tracking, and team collaboration.',
        fullDescription: 'A powerful task management system designed for teams. Features kanban boards, sprint planning, time tracking, file sharing, real-time collaboration, and comprehensive reporting. Ideal for agile teams and project managers.',
        category: 'Web Development',
        techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'AWS S3'],
        features: [
          'Kanban boards and lists',
          'Sprint planning and tracking',
          'Time tracking and reporting',
          'File attachments and sharing',
          'Real-time collaboration',
          'Team member management',
          'Custom workflows',
          'Email and push notifications',
          'Mobile responsive'
        ],
        price: 199,
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
        demoImages: [
          'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800'
        ],
        downloadLink: 'https://github.com/blitzs/task-manager',
        featured: true,
        createdBy: admin._id
      },
      {
        title: 'Fitness Tracking Mobile App',
        shortDescription: 'Cross-platform fitness app with workout plans, nutrition tracking, and progress analytics.',
        fullDescription: 'A comprehensive fitness tracking application built with React Native. Track workouts, monitor nutrition, set goals, and analyze your progress with detailed charts and statistics. Includes pre-built workout plans and meal suggestions.',
        category: 'Mobile App',
        techStack: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
        features: [
          'Workout tracking and logging',
          'Nutrition and calorie tracking',
          'Pre-built workout plans',
          'Progress charts and analytics',
          'Goal setting and reminders',
          'Social sharing',
          'Offline mode',
          'Wearable device integration',
          'iOS and Android support'
        ],
        price: 249,
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
        demoImages: [
          'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800'
        ],
        downloadLink: 'https://github.com/blitzs/fitness-tracker',
        featured: true,
        createdBy: admin._id
      },
      {
        title: 'NFT Marketplace Platform',
        shortDescription: 'Decentralized NFT marketplace with minting, trading, and auction features on Ethereum.',
        fullDescription: 'A complete NFT marketplace built on Ethereum blockchain. Users can mint, buy, sell, and auction NFTs. Features wallet integration, gas optimization, royalty management, and a beautiful gallery interface.',
        category: 'Blockchain',
        techStack: ['Solidity', 'Web3.js', 'React', 'IPFS', 'Hardhat', 'Ethers.js'],
        features: [
          'NFT minting and creation',
          'Buy, sell, and auction NFTs',
          'Wallet integration (MetaMask, WalletConnect)',
          'IPFS storage for metadata',
          'Royalty management',
          'Collection creation',
          'Gas optimization',
          'Activity feed and notifications',
          'Search and filtering'
        ],
        price: 599,
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
        demoImages: [
          'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800'
        ],
        downloadLink: 'https://github.com/blitzs/nft-marketplace',
        featured: true,
        createdBy: admin._id
      },
      {
        title: 'Restaurant Management System',
        shortDescription: 'Complete restaurant POS system with table management, kitchen display, and online ordering.',
        fullDescription: 'An all-in-one restaurant management solution. Includes POS system, table reservations, kitchen display system, inventory management, staff management, and online ordering integration. Perfect for restaurants and cafes.',
        category: 'Web Development',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Stripe'],
        features: [
          'Point of Sale (POS) system',
          'Table management and reservations',
          'Kitchen Display System (KDS)',
          'Menu management',
          'Inventory tracking',
          'Staff management and scheduling',
          'Online ordering integration',
          'Payment processing',
          'Reports and analytics',
          'Multi-location support'
        ],
        price: 399,
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        demoImages: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
        ],
        downloadLink: 'https://github.com/blitzs/restaurant-pos',
        featured: true,
        createdBy: admin._id
      },
      {
        title: 'Video Streaming Platform',
        shortDescription: 'Netflix-like streaming platform with video upload, transcoding, and subscription management.',
        fullDescription: 'A complete video streaming solution similar to Netflix. Features video upload and transcoding, adaptive streaming, user subscriptions, content recommendations, and analytics. Built for scalability and performance.',
        category: 'Web Development',
        techStack: ['React', 'Node.js', 'FFmpeg', 'AWS S3', 'CloudFront', 'MongoDB'],
        features: [
          'Video upload and transcoding',
          'Adaptive bitrate streaming',
          'User authentication and profiles',
          'Subscription management',
          'Content recommendations',
          'Watch history and continue watching',
          'Search and filtering',
          'Admin content management',
          'Analytics dashboard',
          'CDN integration'
        ],
        price: 699,
        image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800',
        demoImages: [
          'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800'
        ],
        downloadLink: 'https://github.com/blitzs/video-streaming',
        createdBy: admin._id
      },
      {
        title: 'Real Estate Listing Platform',
        shortDescription: 'Property listing website with advanced search, virtual tours, and agent management.',
        fullDescription: 'A comprehensive real estate platform for listing and searching properties. Features advanced search filters, virtual tours, agent profiles, appointment scheduling, and mortgage calculator. Perfect for real estate agencies.',
        category: 'Web Development',
        techStack: ['React', 'Node.js', 'MongoDB', 'Google Maps API', 'Stripe'],
        features: [
          'Property listings with photos and details',
          'Advanced search and filters',
          'Interactive maps integration',
          'Virtual tour support',
          'Agent profiles and contact',
          'Appointment scheduling',
          'Mortgage calculator',
          'Saved searches and favorites',
          'Email alerts for new listings',
          'Admin dashboard'
        ],
        price: 349,
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        demoImages: [
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
        ],
        downloadLink: 'https://github.com/blitzs/real-estate',
        createdBy: admin._id
      }
    ]);

    console.log('✅ Projects created');
    console.log('\n📊 Sample Data Summary:');
    console.log(`- Admin: admin@blitzs.dev / admin123`);
    console.log(`- User: user@blitzs.dev / user123`);
    console.log(`- Developers: ${developers.length}`);
    console.log(`- Projects: ${projects.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
