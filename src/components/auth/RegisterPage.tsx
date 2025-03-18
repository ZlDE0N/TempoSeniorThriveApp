import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";

type UserRole = "senior" | "family" | "caregiver";

interface RegisterPageProps {
  showBackButton?: boolean;
  backPath?: string;
}

export default function RegisterPage({
  showBackButton = false,
  backPath = "/",
}: RegisterPageProps = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // User role is now determined by the system or during onboarding
  const [userRole] = useState<UserRole>("senior");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard after successful registration
      navigate("/dashboard");
    }, 1500);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? "bg-slate-900 text-white" : "bg-blue-50"}`}
    >
      {showBackButton && (
        <motion.div
          className="absolute top-4 left-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(backPath)}
            className={
              darkMode ? "border-slate-700 bg-slate-800 hover:bg-slate-700" : ""
            }
          >
            ← Back
          </Button>
        </motion.div>
      )}
      <motion.div
        className="absolute top-4 right-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className={
            darkMode ? "border-slate-700 bg-slate-800 hover:bg-slate-700" : ""
          }
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </motion.div>

      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Link to="/" className="flex justify-center mb-8">
            <div className="text-3xl font-bold tracking-tight transition-transform hover:scale-105">
              <span className="text-st_light_orange">Senior</span>
              <span className="text-st_light_blue">Thrive™</span>
            </div>
          </Link>
        </motion.div>

        <Card
          className={`w-full shadow-lg ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`}
        >
          <CardHeader>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold text-center">
                Create Your Account
              </CardTitle>
              <CardDescription
                className={`text-center mt-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                Join SeniorThrive to get started
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister}>
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`h-12 text-base ${darkMode ? "bg-slate-700 border-slate-600" : ""}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-base font-medium block"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`h-12 text-base ${darkMode ? "bg-slate-700 border-slate-600" : ""}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`h-12 text-base pr-10 ${darkMode ? "bg-slate-700 border-slate-600" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-base font-medium"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`h-12 text-base ${darkMode ? "bg-slate-700 border-slate-600" : ""}`}
                  />
                  {password !== confirmPassword && confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) =>
                      setAgreeTerms(checked as boolean)
                    }
                    className={darkMode ? "border-slate-600" : ""}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="underline hover:text-blue-600"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="underline hover:text-blue-600"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium bg-st_dark_blue hover:bg-st_light_blue"
                    disabled={
                      isLoading || !agreeTerms || password !== confirmPassword
                    }
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-full border-t ${darkMode ? "border-slate-700" : "border-gray-200"}`}
                  ></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className={`px-2 ${darkMode ? "bg-slate-800 text-slate-400" : "bg-white text-gray-500"}`}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`flex justify-center items-center py-2.5 border rounded-md shadow-sm ${darkMode ? "bg-slate-700 border-slate-600 hover:bg-slate-600" : "bg-white hover:bg-gray-50 border-gray-300"}`}
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`flex justify-center items-center py-2.5 border rounded-md shadow-sm ${darkMode ? "bg-slate-700 border-slate-600 hover:bg-slate-600" : "bg-white hover:bg-gray-50 border-gray-300"}`}
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`flex justify-center items-center py-2.5 border rounded-md shadow-sm ${darkMode ? "bg-slate-700 border-slate-600 hover:bg-slate-600" : "bg-white hover:bg-gray-50 border-gray-300"}`}
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </CardContent>

          <CardFooter>
            <motion.p variants={itemVariants} className="text-center w-full">
              <span className={darkMode ? "text-slate-400" : "text-slate-600"}>
                Already have an account?{" "}
              </span>
              <Link
                to="/signin"
                className={`font-medium ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}
              >
                Sign in
              </Link>
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
