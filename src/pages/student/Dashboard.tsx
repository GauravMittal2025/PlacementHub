import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Briefcase, Calendar, FileText, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import NotFound from '../NotFound';

// Student dashboard pages
import JobListings from './JobListings';
import Applications from './Applications';
import Interviews from './Interviews';
import Profile from './Profile';
import Notifications from './Notifications';
import Settings from './Settings';

const StudentDashboardHome: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const recentJobs = [
    { id: '1', title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', salary: '$80K-100K', postedAt: '2 days ago' },
    { id: '2', title: 'Data Scientist', company: 'AnalyticsPro', location: 'New York', salary: '$90K-110K', postedAt: '3 days ago' },
    { id: '3', title: 'Product Manager', company: 'InnovateTech', location: 'San Francisco', salary: '$100K-120K', postedAt: '5 days ago' },
  ];

  const upcomingInterviews = [
    { id: '1', role: 'Software Engineer', company: 'TechCorp', date: 'Jul 15, 2023', time: '2:00 PM' },
    { id: '2', title: 'UX Designer', company: 'DesignHub', date: 'Jul 18, 2023', time: '10:30 AM' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Job Applications" 
          value="12" 
          icon={<FileText size={24} />} 
          change={{ value: 8, type: 'increase' }}
        />
        <StatCard 
          title="Interviews Scheduled" 
          value="3" 
          icon={<Calendar size={24} />}
        />
        <StatCard 
          title="Job Offers" 
          value="1" 
          icon={<Briefcase size={24} />}
          change={{ value: 100, type: 'increase' }}
        />
        <StatCard 
          title="Profile Completion" 
          value="85%" 
          icon={<Users size={24} />}
        />
      </div>
      
      {/* Recent jobs and upcoming interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent job postings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Recent Job Postings</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentJobs.map(job => (
              <div key={job.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{job.company} • {job.location}</p>
                    <div className="flex mt-2 space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Full-time
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Remote
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{job.salary}</span>
                    <p className="text-xs text-gray-500 mt-1">{job.postedAt}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all job postings
            </button>
          </div>
        </div>
        
        {/* Upcoming interviews */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Upcoming Interviews</h2>
          </div>
          {upcomingInterviews.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {upcomingInterviews.map(interview => (
                <div key={interview.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mr-4">
                      {interview.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{interview.role}</h3>
                      <p className="text-sm text-gray-600">{interview.company}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-medium text-gray-900">{interview.date}</p>
                      <p className="text-xs text-gray-500">{interview.time}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md px-3 py-1">
                      Prepare
                    </button>
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-700 border border-gray-300 rounded-md px-3 py-1">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">No upcoming interviews</p>
            </div>
          )}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View interview history
            </button>
          </div>
        </div>
      </div>

      {/* Application status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Application Status</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-700">45%</span>
          </div>
          <div className="grid grid-cols-5 gap-4 text-center">
            <div>
              <div className="font-semibold text-lg text-blue-600">8</div>
              <div className="text-xs text-gray-500">Applied</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-blue-600">3</div>
              <div className="text-xs text-gray-500">Shortlisted</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-blue-600">2</div>
              <div className="text-xs text-gray-500">Interviewing</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-blue-600">1</div>
              <div className="text-xs text-gray-500">Offered</div>
            </div>
            <div>
              <div className="font-semibold text-lg text-gray-600">0</div>
              <div className="text-xs text-gray-500">Rejected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder component for missing pages
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-600">This is a placeholder for the {title.toLowerCase()} page.</p>
  </div>
);

// Create placeholder components for pages not yet implemented
const JobListingsPlaceholder = () => <PlaceholderPage title="Job Listings" />;
const ApplicationsPlaceholder = () => <PlaceholderPage title="My Applications" />;
const InterviewsPlaceholder = () => <PlaceholderPage title="Interviews" />;
const ProfilePlaceholder = () => <PlaceholderPage title="Profile" />;
const NotificationsPlaceholder = () => <PlaceholderPage title="Notifications" />;
const SettingsPlaceholder = () => <PlaceholderPage title="Settings" />;

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }

  return (
    <DashboardLayout title="Student Dashboard" user={user}>
      <Routes>
        <Route path="/" element={<StudentDashboardHome />} />
        <Route path="/jobs" element={<JobListingsPlaceholder />} />
        <Route path="/applications" element={<ApplicationsPlaceholder />} />
        <Route path="/interviews" element={<InterviewsPlaceholder />} />
        <Route path="/profile" element={<ProfilePlaceholder />} />
        <Route path="/notifications" element={<NotificationsPlaceholder />} />
        <Route path="/settings" element={<SettingsPlaceholder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentDashboard;