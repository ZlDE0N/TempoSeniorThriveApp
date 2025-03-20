import { useState } from "react";
import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Moon, Sun } from "lucide-react";

interface ForgotPasswordPageProps {
  showBackButton?: boolean;
  backPath?: string;
}

export default function ForgotPasswordPage({
  showBackButton = false,
  backPath = "/signin",
}: ForgotPasswordPageProps = {}) {
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
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
                {isSubmitted ? "Check Your Email" : "Reset Your Password"}
              </CardTitle>
              <CardDescription
                className={`text-center mt-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {isSubmitted
                  ? "We've sent you instructions to reset your password"
                  : "Enter your email and we'll send you instructions to reset your password"}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <motion.div variants={itemVariants} className="space-y-4">
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

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium bg-st_dark_blue hover:bg-st_light_blue"
                      disabled={isLoading}
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
                          Sending instructions...
                        </>
                      ) : (
                        "Send Reset Instructions"
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            ) : (
              <motion.div variants={itemVariants} className="text-center py-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p
                  className={`text-lg ${darkMode ? "text-slate-300" : "text-slate-700"} mb-6`}
                >
                  We've sent an email to <strong>{email}</strong> with
                  instructions to reset your password.
                </p>
                <p
                  className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"} mb-6`}
                >
                  If you don't see the email, please check your spam folder or
                  request another reset link.
                </p>
                <Button
                  variant="outline"
                  className={`mt-2 ${darkMode ? "border-slate-700 hover:bg-slate-700" : ""}`}
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Again
                </Button>
              </motion.div>
            )}
          </CardContent>

          <CardFooter>
            <motion.div variants={itemVariants} className="w-full">
              <Link
                to="/signin"
                className={`flex items-center justify-center font-medium ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
