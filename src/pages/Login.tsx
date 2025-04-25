import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Briefcase, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'placement' | 'company'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to their dashboard
  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password, role);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login credentials
  const fillCredentials = (userType: 'student' | 'placement' | 'company') => {
    setRole(userType);
    setEmail(`${userType}@example.com`);
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Left side - Image and branding */}
        <div className="hidden md:block relative bg-blue-600 text-white p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-90" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">PlaceHub</h1>
              <p className="text-blue-100">Streamlining campus placements</p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Welcome Back!</h2>
              <p className="text-blue-100">
                Connect students with opportunities, companies with talent, and
                placement teams with powerful tools.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                    <BookOpen size={16} />
                  </div>
                  <span>Student portal for job searches & applications</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                    <Building size={16} />
                  </div>
                  <span>Company recruitment campaign management</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                    <Briefcase size={16} />
                  </div>
                  <span>Powerful tools for placement coordinators</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Login form */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Log in to your account</h2>
            <p className="text-gray-600">Choose your account type and enter credentials</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role selection */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => fillCredentials('student')}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all hover:bg-blue-50 
                  ${role === 'student' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              >
                <BookOpen size={24} className={role === 'student' ? 'text-blue-600' : 'text-gray-500'} />
                <span className={`mt-2 text-sm ${role === 'student' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                  Student
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => fillCredentials('placement')}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all hover:bg-blue-50
                  ${role === 'placement' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              >
                <Briefcase size={24} className={role === 'placement' ? 'text-blue-600' : 'text-gray-500'} />
                <span className={`mt-2 text-sm ${role === 'placement' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                  Placement
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => fillCredentials('company')}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all hover:bg-blue-50
                  ${role === 'company' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              >
                <Building size={24} className={role === 'company' ? 'text-blue-600' : 'text-gray-500'} />
                <span className={`mt-2 text-sm ${role === 'company' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                  Company
                </span>
              </button>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            
            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter your password"
                required
              />
              <div className="mt-1 text-sm text-gray-500">
                For demo: use 'password'
              </div>
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Demo accounts are available for all user types</p>
            <p className="mt-1">Just click on a user type and login with the pre-filled credentials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;