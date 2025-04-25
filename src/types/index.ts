export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'placement' | 'company';
  profileImage?: string;
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  department: string;
  year: number;
  cgpa: number;
  skills: string[];
  resume?: string;
  applications: JobApplication[];
}

export interface PlacementTeam extends User {
  role: 'placement';
  position: string;
  department: string;
}

export interface Company extends User {
  role: 'company';
  companyName: string;
  industry: string;
  description: string;
  website: string;
  logo?: string;
  jobs: Job[];
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'internship';
  skills: string[];
  createdAt: string;
  deadline: string;
  status: 'open' | 'closed' | 'draft';
  applications?: JobApplication[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  studentId: string;
  status: 'applied' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected';
  appliedAt: string;
  resumeUrl?: string;
  interviewDate?: string;
  feedback?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface AnalyticsData {
  placementRate: number;
  totalStudents: number;
  totalCompanies: number;
  totalJobs: number;
  averageSalary: number;
  topCompanies: { name: string; placements: number }[];
}