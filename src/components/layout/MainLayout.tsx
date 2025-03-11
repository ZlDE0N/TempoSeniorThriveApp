import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white shadow-md">
        <div className="flex-1 flex flex-col min-h-0 border-r border-slate-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-slate-200">
            <h1 className="text-xl font-bold text-blue-600">SeniorThrive</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link
                to="/"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-blue-50 text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 flex-shrink-0 h-6 w-6 text-blue-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                Dashboard
              </Link>

              <Link
                to="/assessments"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 flex-shrink-0 h-6 w-6 text-slate-400 group-hover:text-slate-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Assessments
              </Link>

              <Link
                to="/progress"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 flex-shrink-0 h-6 w-6 text-slate-400 group-hover:text-slate-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                Progress
              </Link>

              <Link
                to="/resources"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 flex-shrink-0 h-6 w-6 text-slate-400 group-hover:text-slate-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 6.25c1.25 0 2.5.25 3.5.75m-7 0c1-.5 2.25-.75 3.5-.75m-3.5-.75c1-.5 2.25-.75 3.5-.75s2.5.25 3.5.75m-7 1.5v10.5m7-10.5v10.5m-7-10.5c1-.5 2.25-.75 3.5-.75s2.5.25 3.5.75m-7 10.5c1-.5 2.25-.75 3.5-.75s2.5.25 3.5.75" />
                  <path d="M12 19.25c1.25 0 2.5-.25 3.5-.75V18m-7 .5v.75c1-.5 2.25-.75 3.5-.75s2.5.25 3.5.75V18.5m-7 0c1-.5 2.25-.75 3.5-.75s2.5.25 3.5.75" />
                </svg>
                Resources
              </Link>

              <Link
                to="/settings"
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 flex-shrink-0 h-6 w-6 text-slate-400 group-hover:text-slate-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-slate-200 p-4">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Margaret"
                  alt="User avatar"
                />
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-slate-700">
                  Margaret Wilson
                </p>
                <button
                  onClick={() => navigate("/onboarding")}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-white w-full fixed top-0 z-10 border-b border-slate-200">
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold text-blue-600">SeniorThrive</h1>
          <button
            type="button"
            className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
