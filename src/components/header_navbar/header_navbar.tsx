import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/dashboard/ui/button";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderNavbarProps {
  navItems: NavItem[];
  isAuthenticated: boolean;
  userName: string;
  isPremium: boolean;
  handleLogout: () => void;
  isFixed?: boolean;
}

export default function HeaderNavbar({
  navItems,
  isAuthenticated,
  userName,
  isPremium,
  handleLogout,
  isFixed = true,
}: HeaderNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`w-full bg-white z-50 shadow-md transition-all ${
        isFixed ? "fixed top-0 left-0 right-0" : "sticky top-0"
      }`}
    >
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-6 py-4 flex justify-between items-center"
      >
        {/* 📌 Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight transition-transform hover:scale-105"
          >
            <span className="text-st_light_orange">Senior</span>
            <span className="text-st_light_blue">Thrive™</span>
          </Link>
        </div>

        {/* 📌 Desktop Navigation - Se oculta en 968px (lg:hidden) */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-base font-medium text-slate-700 hover:text-st_light_blue hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all"
                  asChild
                >
                  <Link to={item.href}>{item.label}</Link>
                </Button>
              </motion.div>
            ))}
          </nav>

          {isAuthenticated && (
            <>
              <div className="h-8 w-px bg-slate-200 mx-2"></div>

              <div className="flex items-center space-x-5">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full shadow-sm ${
                    isPremium
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-slate-100 text-slate-800 border border-slate-200"
                  }`}
                >
                  {isPremium ? "Premium Active" : "Free Plan"}
                </motion.span>

                <span className="text-base font-medium text-slate-700">
                  Welcome, {userName}
                </span>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-medium border-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </motion.div>
              </div>
            </>
          )}
        </div>

        {/* 📌 Mobile Menu Button - Se muestra en 968px (lg:hidden) */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-md hover:bg-blue-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </motion.svg>
          </Button>
        </div>
      </motion.div>

      {/* 📌 Mobile Menu - Se muestra en 968px (lg:hidden) */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isMenuOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`lg:hidden bg-white border-t border-slate-200 px-6 py-4 shadow-lg ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-3 py-3">
          {navItems.map((item) => (
            <motion.div
              key={item.label}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={item.href}
                className="px-4 py-3 text-base font-medium text-slate-700 hover:text-st_light_blue hover:bg-blue-50 rounded-lg flex items-center transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          {isAuthenticated && (
            <>
              <div className="h-px bg-slate-200 my-3"></div>

              <div className="px-4 py-3 flex items-center justify-between bg-slate-50 rounded-lg">
                <div className="flex flex-col">
                  <span
                    className={`px-3 py-1.5 text-sm font-medium rounded-full w-fit shadow-sm ${
                      isPremium
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-slate-100 text-slate-800 border border-slate-200"
                    }`}
                  >
                    {isPremium ? "Premium Active" : "Free Plan"}
                  </span>
                  <span className="text-base font-medium text-slate-700 mt-2">
                    Welcome, {userName}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  className="font-medium border-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </header>
  );
}
