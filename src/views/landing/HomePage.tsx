import { Heart, Shield, Users, Clock, ArrowRight } from 'lucide-react';
import { useUserStore } from '../../store/dashboard_store/userStore';
import HeaderNavbar from '../../components/header_navbar/header_navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeLink from '@/components/home/HomeLink';


const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "/profile" },
];


export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulate authentication state
  const [isPremium, setIsPremium] = useState(false); // This would come from your auth context or state management
  const [userName, setUserName] = useState("John"); // This would come from your auth context or state management
  
  const navigate = useNavigate();
  
  const { setCurrentUser } = useUserStore();

  const handleDemoLogin = (role: 'caregiver' | 'family') => {
    setCurrentUser({
      id: crypto.randomUUID(),
      name: role === 'caregiver' ? 'Demo Caregiver' : 'Demo Family Member',
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
    });
  
    // Redirigir a onboarding
    navigate('/onboarding/process');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <HeaderNavbar
        navItems={navItems}
        isAuthenticated={isAuthenticated}
        userName={userName}
        isPremium={isPremium}
        handleLogout={() => console.log("Logout")}
        isFixed={false} // 🔹 Cambia esto según la necesidad
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header
        <header className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-dark">CareLog</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDemoLogin('family')}
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-hover"
              >
                Family Demo
              </button>
              <button
                onClick={() => handleDemoLogin('caregiver')}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
              >
                Caregiver Demo
              </button>
            </div>
          </div>
        </header> */}

        {/* Hero Section */}
        <div className="py-20 text-center">
          <h1 className="text-5xl font-bold text-dark mb-6">
            Your Journey to Independent Living
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Take control of your wellbeing with confidence. CareLog empowers you to live life on your terms, 
            while staying connected to those who matter most.
          </p>
          <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleDemoLogin('family')}
            className="px-8 py-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-primary hover:bg-primary-hover transform transition hover:scale-105"
            >
            Begin Your Journey
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <h2 className="text-3xl font-bold text-dark text-center mb-12">
            Your Path to Thriving at Home
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="p-3 bg-primary-light rounded-full w-fit">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                Empowered Living
              </h3>
              <p className="text-gray-600">
                Track your health journey with confidence, making informed decisions that help you thrive independently.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="p-3 bg-secondary-light rounded-full w-fit">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                Connected Care Circle
              </h3>
              <p className="text-gray-600">
                Stay connected with family and caregivers who support your independence while respecting your privacy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="p-3 bg-accent-light rounded-full w-fit">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                Life on Your Terms
              </h3>
              <p className="text-gray-600">
                Maintain your daily routines and activities with tools that adapt to your lifestyle and preferences.
              </p>
            </div>
          </div>
        </div>

       
      </div>
       {/* Footer */}
       <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                <span className="text-st_light_orange">Senior</span>
                <span className="text-st_light_blue">Thrive™</span>
              </h3>
              <p className="mb-4 text-sm">
                Empowering independence and peace of mind through innovative
                care management solutions.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 mt-1"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 mt-1"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>support@seniorthrive.com</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 mt-1"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>
                    123 Care Lane, Suite 456
                    <br />
                    San Francisco, CA 94103
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-center">
            <p>
              &copy; {new Date().getFullYear()} SeniorThrive. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* <HomeLink /> */}
    </div>
  );
}
