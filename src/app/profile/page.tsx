'use client';

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const profileData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543"
    },
    employmentHistory: [
      {
        company: "TechCorp Inc.",
        position: "Software Developer",
        startDate: "Jan 2025",
        status: "Active"
      },
      {
        company: "StartupXYZ",
        position: "Frontend Developer",
        startDate: "Pending",
        status: "Pending"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Profile</h1>
              <p className="text-gray-600">Manage your personal information and settings</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="btn-primary">
                Edit Profile
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Overview */}
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mr-6 mb-4 sm:mb-0">
                <span className="text-2xl font-bold text-primary-600">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600 mb-2">{profileData.email}</p>
                <p className="text-gray-600">{profileData.phone}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="text-gray-900 py-2">{profileData.firstName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="text-gray-900 py-2">{profileData.lastName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="text-gray-900 py-2">{profileData.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="text-gray-900 py-2">{profileData.phone}</div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Address</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <div className="text-gray-900 py-2">{profileData.address.street}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <div className="text-gray-900 py-2">{profileData.address.city}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <div className="text-gray-900 py-2">{profileData.address.state}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <div className="text-gray-900 py-2">{profileData.address.zipCode}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="text-gray-900 py-2">{profileData.emergencyContact.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <div className="text-gray-900 py-2">{profileData.emergencyContact.relationship}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="text-gray-900 py-2">{profileData.emergencyContact.phone}</div>
              </div>
            </div>
          </div>

          {/* Employment History */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Employment History</h2>
            <div className="space-y-4">
              {profileData.employmentHistory.map((job, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="font-semibold text-gray-900">{job.company}</h3>
                      <p className="text-gray-600">{job.position}</p>
                      <p className="text-sm text-gray-500">Started: {job.startDate}</p>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/tasks" className="card text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium text-gray-900 mb-1">View Tasks</div>
              <div className="text-sm text-gray-600">Check pending tasks</div>
            </Link>
            <Link href="/documents" className="card text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">📁</div>
              <div className="font-medium text-gray-900 mb-1">Documents</div>
              <div className="text-sm text-gray-600">Manage documents</div>
            </Link>
            <Link href="/dashboard" className="card text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium text-gray-900 mb-1">Dashboard</div>
              <div className="text-sm text-gray-600">View overview</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}