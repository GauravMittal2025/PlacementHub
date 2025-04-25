import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BarChart3, Building, Briefcase, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import NotFound from '../NotFound';

// Placeholder component for missing pages
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-600">This is a placeholder for the {title.toLowerCase()} page.</p>
  </div>
);

const PlacementDashboardHome: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const recentCompanies = [
    { id: '1', name: 'TechCorp', industry: 'Technology', status: 'Active', openPositions: 5, lastActivity: '2 days ago' },
    { id: '2', name: 'FinancePro', industry: 'Finance', status: 'Active', openPositions: 3, lastActivity: '1 week ago' },
    { id: '3', name: 'MarketingSuite', industry: 'Marketing', status: 'Pending', openPositions: 0, lastActivity: '3 hours ago' },
  ];

  const topJobs = [
    { id: '1', title: 'Software Engineer', company: 'TechCorp', applications: 45, deadline: '5 days remaining' },
    { id: '2', title: 'Data Analyst', company: 'AnalyticsPro', applications: 32, deadline: '2 days remaining' },
    { id: '3', title: 'Product Manager', company: 'InnovateTech', applications: 28, deadline: '9 days remaining' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="1,253" 
          icon={<Users size={24} />} 
          change={{ value: 4, type: 'increase' }}
        />
        <StatCard 
          title="Registered Companies" 
          value="48" 
          icon={<Building size={24} />}
          change={{ value: 12, type: 'increase' }}
        />
        <StatCard 
          title="Active Job Postings" 
          value="67" 
          icon={<Briefcase size={24} />}
          change={{ value: 8, type: 'increase' }}
        />
        <StatCard 
          title="Placement Rate" 
          value="76%" 
          icon={<TrendingUp size={24} />}
          change={{ value: 5, type: 'increase' }}
        />
      </div>
      
      {/* Analytics chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Placement Analytics</h2>
          <div className="flex space-x-2">
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5">
              <option>This Year</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto text-gray-300" />
              <p className="mt-2 text-gray-500">Placement analytics visualization would appear here</p>
              <p className="text-sm text-gray-400">Showing placement trends by department and job type</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Companies and top jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent companies */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Recent Companies</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentCompanies.map(company => (
              <div key={company.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mr-4">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      company.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {company.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{company.lastActivity}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">{company.openPositions} open positions</span>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all companies
            </button>
          </div>
        </div>
        
        {/* Top jobs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Top Jobs</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topJobs.map(job => (
              <div key={job.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{job.applications} applications</span>
                    <p className="text-xs text-gray-500 mt-1">{job.deadline}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="w-2/3 pr-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, Math.floor(job.applications / 50 * 100))}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">{Math.floor(job.applications / 50 * 100)}%</span>
                    </div>
                  </div>
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
      </div>
      
      {/* Department performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Department Performance</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Computer Science</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-1">92%</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Electronics</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-1">87%</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Mechanical</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-1">71%</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '71%' }}></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Civil</h3>
              <p className="text-2xl font-semibold text-gray-800 mt-1">62%</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create placeholder components for pages not yet implemented
const StudentsPlaceholder = () => <PlaceholderPage title="Students" />;
const CompaniesPlaceholder = () => <PlaceholderPage title="Companies" />;
const JobsPlaceholder = () => <PlaceholderPage title="Job Postings" />;
const AnalyticsPlaceholder = () => <PlaceholderPage title="Analytics" />;
const NotificationsPlaceholder = () => <PlaceholderPage title="Notifications" />;
const SettingsPlaceholder = () => <PlaceholderPage title="Settings" />;

const PlacementDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }

  return (
    <DashboardLayout title="Placement Team Dashboard" user={user}>
      <Routes>
        <Route path="/" element={<PlacementDashboardHome />} />
        <Route path="/students" element={<StudentsPlaceholder />} />
        <Route path="/companies" element={<CompaniesPlaceholder />} />
        <Route path="/jobs" element={<JobsPlaceholder />} />
        <Route path="/analytics" element={<AnalyticsPlaceholder />} />
        <Route path="/notifications" element={<NotificationsPlaceholder />} />
        <Route path="/settings" element={<SettingsPlaceholder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

export default PlacementDashboard;