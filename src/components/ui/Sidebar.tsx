import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar,
  BarChart3, 
  Bell, 
  Settings, 
  LogOut,
  User,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  role: 'student' | 'placement' | 'company';
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Different navigation items for each role
  const navItems: Record<'student' | 'placement' | 'company', NavItem[]> = {
    student: [
      { path: '/student', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { path: '/student/jobs', label: 'Job Listings', icon: <Briefcase size={20} /> },
      { path: '/student/applications', label: 'My Applications', icon: <FileText size={20} /> },
      { path: '/student/interviews', label: 'Interviews', icon: <Calendar size={20} /> },
      { path: '/student/profile', label: 'My Profile', icon: <User size={20} /> },
    ],
    placement: [
      { path: '/placement', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { path: '/placement/students', label: 'Students', icon: <Users size={20} /> },
      { path: '/placement/companies', label: 'Companies', icon: <Briefcase size={20} /> },
      { path: '/placement/jobs', label: 'Job Postings', icon: <FileText size={20} /> },
      { path: '/placement/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    ],
    company: [
      { path: '/company', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { path: '/company/jobs', label: 'Job Postings', icon: <Briefcase size={20} /> },
      { path: '/company/applications', label: 'Applications', icon: <FileText size={20} /> },
      { path: '/company/interviews', label: 'Interviews', icon: <Calendar size={20} /> },
      { path: '/company/profile', label: 'Company Profile', icon: <User size={20} /> },
    ],
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Sidebar header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">PlaceHub</h1>
        <p className="text-sm text-gray-500 mt-1">
          {role === 'student' 
            ? 'Student Portal' 
            : role === 'placement' 
              ? 'Placement Portal' 
              : 'Company Portal'}
        </p>
      </div>
      
      {/* Navigation links */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {navItems[role].map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === `/${role}`}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <ul className="space-y-1">
            <li>
              <NavLink
                to={`/${role}/notifications`}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3"><Bell size={20} /></span>
                <span>Notifications</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${role}/settings`}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3"><Settings size={20} /></span>
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <span className="mr-3"><LogOut size={20} /></span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;