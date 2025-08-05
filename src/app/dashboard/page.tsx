'use client';

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  // Mock onboarding data
  const onboardingProgress = 75;
  const tasksCompleted = 3;
  const tasksRemaining = 1;
  
  const currentTask = {
    id: 1,
    title: "Upload Profile Photo",
    description: "Add a professional photo to complete your profile",
    priority: "High",
    dueDate: "Jan 15, 2025",
    estimatedTime: "5 min"
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getUserName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return "there";
  };

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

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        
        {/* Welcome Message */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {getUserName()}! 👋
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            You&apos;re almost done with your onboarding
          </p>
        </header>

        {/* Overall Progress */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Onboarding Progress</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">{onboardingProgress}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${onboardingProgress}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            Great progress! Just a few more steps to complete your setup.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
              {tasksCompleted}
            </div>
            <div className="text-sm text-gray-600">Tasks Done</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
              {tasksRemaining}
            </div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>

        {/* Current Task Card */}
        <div className="card border-l-4 border-l-primary-600 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center mb-2">
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full mr-2">
                  {currentTask.priority}
                </span>
                <span className="text-xs text-gray-500">
                  {currentTask.estimatedTime}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {currentTask.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {currentTask.description}
              </p>
              <div className="text-xs text-gray-500">
                📅 Due: {currentTask.dueDate}
              </div>
            </div>
          </div>
          
          <Link 
            href="/tasks"
            className="btn-primary w-full text-center block"
          >
            Continue
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Link href="/tasks" className="card text-center hover:shadow-md transition-all hover:scale-105">
            <div className="text-2xl mb-2">📋</div>
            <div className="text-xs font-medium text-gray-700 leading-tight">All Tasks</div>
          </Link>
          <Link href="/documents" className="card text-center hover:shadow-md transition-all hover:scale-105">
            <div className="text-2xl mb-2">📁</div>
            <div className="text-xs font-medium text-gray-700 leading-tight">Documents</div>
          </Link>
          <Link href="/profile" className="card text-center hover:shadow-md transition-all hover:scale-105">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-xs font-medium text-gray-700 leading-tight">Profile</div>
          </Link>
        </div>

        {/* Encouragement Message */}
        <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🎉</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Almost there!</h3>
              <p className="text-sm text-gray-600">
                Complete your final task to finish onboarding with TechCorp Inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}