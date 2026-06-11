import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  CalendarDays,
  LogOut,
  User,
  Menu,
  X,
  ChevronRight,
  Building2,
  NotebookPen,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar({
  user,
  logout,
  loginTime,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (logout) logout();
    navigate("/login");
  };

  const getLoginDuration = () => {
    if (!loginTime) return "Just now";

    const loginDate = new Date(loginTime);
    const now = new Date();

    const diffMins = Math.floor((now - loginDate) / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);

    return diffHours < 24
      ? `${diffHours}h ago`
      : `${Math.floor(diffHours / 24)}d ago`;
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Job Vacancies",
      path: "/jobs",
      icon: Briefcase,
    },
    {
      name: "Candidates",
      path: "/candidates",
      icon: Users,
    },
    {
      name: "Applications",
      path: "/applications",
      icon: FileText,
    },
    {
      name: "Blog",
      path: "/blog",
      icon:  NotebookPen,
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#154895] text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

    
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col border-r border-slate-800 shadow-2xl
        `}
      >
       
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-[#154895] p-2 rounded-xl text-white shadow-lg">
              <Building2 size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Asliya Manpower
              </h2>

              <p className="text-[10px] uppercase tracking-[2px] text-blue-400 font-bold">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {user && (
          <div className="mx-4 my-6 p-4 bg-slate-800/40 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#154895]/20 border border-[#154895]/30 flex items-center justify-center text-blue-400">
                <User size={24} />
              </div>

              <div className="overflow-hidden">
                <h3 className="text-sm font-semibold text-white truncate">
                  {user.name}
                </h3>

                <p className="text-xs text-slate-400 capitalize">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>

              <span className="text-[11px] font-medium text-green-400">
                Active: {getLoginDuration()}
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <p className="px-4 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Recruitment Menu
          </p>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`
                group flex items-center justify-between
                px-4 py-3.5 rounded-xl transition-all duration-200
                ${
                  isActive(item.path)
                    ? "bg-[#154895] text-white shadow-lg"
                    : "hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={20}
                  className={
                    isActive(item.path)
                      ? "text-white"
                      : "text-slate-400 group-hover:text-blue-400"
                  }
                />

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </div>

              {isActive(item.path) && (
                <ChevronRight size={16} />
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
          >
            <LogOut size={20} />
            Logout
          </button>

          <div className="px-4 py-2">
            <p className="text-[10px] text-slate-500">
              © 2026 Asliya Manpower Supply
            </p>

            <p className="text-[10px] text-slate-600 mt-1">
              Recruitment Management System
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}