// HeaderNavbar.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/views/dashboard/ui/button";
import fullLogo from "@/assets/icons/seniorthrive-full-logo.svg";
import { useUserStore, type User, type UserRole } from '../../store/dashboard_store/userStore';

interface NavItem {
  label: string;
  href?: string;
  subItems?: {
    label: string;
    role: UserRole;
  }[];
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
  handleLogout,
  isFixed = true,
}: HeaderNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const currentUser = useUserStore(state => state.currentUser);
  const setCurrentUser = useUserStore(state => state.setCurrentUser);
  const setCareMode = useUserStore(state => state.setCareMode);
  const isPremium = useUserStore(state => state.isPremium);
  const setPremium = useUserStore(state => state.setPremium);

  const handleChangeRole = (newRole: UserRole) => {
    if (!currentUser) return;
    const updatedUser: User = {
      ...currentUser,
      role: newRole,
    };
    setCurrentUser(updatedUser);
    setCareMode(newRole === 'self' ? 'self' : 'patient');
    setDropdownOpen(false);
  };

  return (
    <header className={`w-full bg-white z-50 shadow-md transition-all ${isFixed ? "fixed top-0 left-0 right-0" : "relative"}`}>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-6 py-4 flex justify-between items-center"
      >
        <div className="flex items-center">
          <Link to="/" className="transition-transform hover:scale-105">
            <img src={fullLogo} alt="SeniorThrive Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {item.subItems ? (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-base font-medium text-slate-700 hover:text-st_light_blue hover:bg-blue-50"
                      onClick={() => setDropdownOpen(!isDropdownOpen)}
                    >
                      {item.label}
                    </Button>
                    {isDropdownOpen && (
                      <div className="absolute mt-2 w-48 bg-white border rounded shadow z-50">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.label}
                            onClick={() => handleChangeRole(subItem.role)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-base font-medium text-slate-700 hover:text-st_light_blue hover:bg-blue-50"
                    asChild
                  >
                    <Link to={item.href!}>{item.label}</Link>
                  </Button>
                )}
              </motion.div>
            ))}

            <Button
              variant="outline"
              size="lg"
              className="font-medium border-2 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
              onClick={() => setPremium(!isPremium)}
            >
              {isPremium ? 'Disable ThriveMax' : 'Activate ThriveMax'}
            </Button>
          </nav>

          {isAuthenticated && (
            <>
              <div className="h-8 w-px bg-slate-200 mx-2"></div>
              <div className="flex items-center space-x-5 w-max">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full shadow-sm ${isPremium
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-slate-100 text-slate-800 border border-slate-200 w-"}`}
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
                    className="font-medium border-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </header>
  );
}
