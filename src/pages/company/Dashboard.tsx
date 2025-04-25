import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Briefcase, Users, TrendingUp, FileText } from 'lucide-react';
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

const CompanyDashboardHome: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const activeJobs = [
    { id: '1', title: 'Frontend Developer', type: 'Full-time', applications: 45, deadline: 'Jul 20, 2023', status: 'Active' },
    { id: '2', title: 'Backend Engineer', type: 'Full-time', applications: 38, deadline: 'Jul 25, 2023', status: 'Active' },
    { id: '3', title: 'UI/UX Designer', type: 'Full-time', applications: 27, deadline: 'Jul 30, 2023', status: 'Active' },
  ];

  const topCandidates = [
    { id: '1', name: 'Alex Johnson', role: 'Frontend Developer', department: 'Computer Science', cgpa: '3.8', status: 'Shortlisted' },
    { id: '2', name: 'Sam Wilson', role: 'Backend Engineer', department: 'Information Technology', cgpa: '3.9', status: 'Interviewed' },
    { id: '3', name: 'Jamie Smith', role: 'UI/UX Designer', department: 'Design', cgpa: '3.7', status: 'Applied' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Jobs" 
          value="5" 
          icon={<Briefcase size={24} />} 
        />
        <StatCard 
          title="Total Applications" 
          value="124" 
          icon={<FileText size={24} />}
          change={{ value: 15, type: 'increase' }}
        />
        <StatCard 
          title="Shortlisted Candidates" 
          value="28" 
          icon={<Users size={24} />}
          change={{ value: 10, type: 'increase' }}
        />
        <StatCard 
          title="Conversion Rate" 
          value="22%" 
          icon={<TrendingUp size={24} />}
          change={{ value: 5, type: 'increase' }}
        />
      </div>
      
      {/* Active jobs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">Active Job Postings</h2>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Create New Job
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{job.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{job.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{job.applications}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{job.deadline}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="font-medium text-blue-600 hover:text-blue-700 mr-3">
                      View
                    </button>
                    <button className="font-medium text-gray-600 hover:text-gray-700">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Top candidates and application stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top candidates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Top Candidates</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {topCandidates.map(candidate => (
              <div key={candidate.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mr-4">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-600">{candidate.role}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      candidate.status === 'Shortlisted' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : candidate.status === 'Interviewed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {candidate.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">CGPA: {candidate.cgpa}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">{candidate.department}</span>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all candidates
            </button>
          </div>
        </div>
        
        {/* Application stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Application Pipeline</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Applications by status</span>
              </div>
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-blue-600 h-full" style={{ width: '45%' }}></div>
                  <div className="bg-yellow-500 h-full" style={{ width: '25%' }}></div>
                  <div className="bg-green-500 h-full" style={{ width: '15%' }}></div>
                  <div className="bg-red-500 h-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>New (45%)</span>
                <span>Shortlisted (25%)</span>
                <span>Interviewed (15%)</span>
                <span>Rejected (15%)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Application Sources</div>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Campus Portal</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Referrals</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Other</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Department Distribution</div>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Computer Science</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Information Technology</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Other Departments</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create placeholder components for pages not yet implemented
const JobsPlaceholder = () => <PlaceholderPage title="Job Postings" />;
const ApplicationsPlaceholder = () => <PlaceholderPage title="Applications" />;
const InterviewsPlaceholder = () => <PlaceholderPage title="Interviews" />;
const ProfilePlaceholder = () => <PlaceholderPage title="Company Profile" />;
const NotificationsPlaceholder = () => <PlaceholderPage title="Notifications" />;
const SettingsPlaceholder = () => <PlaceholderPage title="Settings" />;

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }

  return (
    <DashboardLayout title="Company Dashboard" user={user}>
      <Routes>
        <Route path="/" element={<CompanyDashboardHome />} />
        <Route path="/jobs" element={<JobsPlaceholder />} />
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

export default CompanyDashboard;