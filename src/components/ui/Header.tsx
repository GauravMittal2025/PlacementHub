import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Menu, X } from 'lucide-react';

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications
  const notifications = [
    {
      id: '1',
      title: 'New job posting',
      message: 'TechCorp has posted a new job for Software Engineer',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: '2',
      title: 'Application update',
      message: 'Your application for Data Analyst at DataSense has been reviewed',
      time: '2 hours ago',
      read: true,
    },
    {
      id: '3',
      title: 'Interview scheduled',
      message: 'You have an interview with InnovateTech on July 15th at 2:00 PM',
      time: '1 day ago',
      read: true,
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-1 mr-4 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Notifications</h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications yet
                  </div>
                ) : (
                  <div>
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          {!notification.read && (
                            <div className="h-2 w-2 mt-1.5 mr-2 bg-blue-500 rounded-full"></div>
                          )}
                          <div className={`${!notification.read ? 'ml-0' : 'ml-4'}`}>
                            <p className="font-medium text-gray-800">{notification.title}</p>
                            <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-gray-200">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 p-1.5">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User profile */}
        <div className="flex items-center">
          <div className="mr-3 hidden sm:block">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">
              {user?.role === 'student' 
                ? 'Student' 
                : user?.role === 'placement' 
                  ? 'Placement Team' 
                  : 'Company Admin'}
            </p>
          </div>
          <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={user.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold">
                {user?.name?.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;