'use client';

import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Tasks() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const tasks = [
    {
      id: 1,
      title: "Upload Profile Photo",
      description: "Add a professional photo to complete your profile setup",
      employer: "TechCorp Inc.",
      priority: "High",
      dueDate: "2025-01-10", // Past due
      status: "todo",
      estimatedTime: "5 min",
      completedDate: null,
      category: "Profile Setup"
    },
    {
      id: 2,
      title: "Complete I-9 Form",
      description: "Fill out employment eligibility verification form",
      employer: "TechCorp Inc.",
      priority: "High",
      dueDate: "2025-01-15", // Due soon
      status: "in_progress",
      estimatedTime: "15 min",
      completedDate: null,
      category: "Legal Documents"
    },
    {
      id: 3,
      title: "Upload Photo ID",
      description: "Provide a clear photo of your government-issued ID",
      employer: "TechCorp Inc.",
      priority: "High",
      dueDate: "2025-01-15", // Due soon
      status: "todo",
      estimatedTime: "5 min",
      completedDate: null,
      category: "Identity Verification"
    },
    {
      id: 4,
      title: "Emergency Contact Information",
      description: "Add emergency contact details to your profile",
      employer: "TechCorp Inc.",
      priority: "Medium",
      dueDate: "2025-01-18",
      status: "todo",
      estimatedTime: "10 min",
      completedDate: null,
      category: "Personal Information"
    },
    {
      id: 5,
      title: "Direct Deposit Setup",
      description: "Configure your bank account for payroll",
      employer: "StartupXYZ",
      priority: "High",
      dueDate: "2025-01-20",
      status: "in_progress",
      estimatedTime: "10 min",
      completedDate: null,
      category: "Payroll Setup"
    },
    {
      id: 6,
      title: "Benefits Enrollment",
      description: "Choose your health and dental insurance options",
      employer: "StartupXYZ",
      priority: "Medium",
      dueDate: "2025-01-25",
      status: "todo",
      estimatedTime: "30 min",
      completedDate: null,
      category: "Benefits"
    },
    {
      id: 7,
      title: "W-4 Tax Form",
      description: "Complete tax withholding information",
      employer: "MegaCorp Ltd.",
      priority: "High",
      dueDate: "2025-01-05",
      status: "done",
      estimatedTime: "15 min",
      completedDate: "2025-01-03",
      category: "Tax Documents"
    },
    {
      id: 8,
      title: "Company Handbook Review",
      description: "Read and acknowledge company policies and procedures",
      employer: "TechCorp Inc.",
      priority: "Medium",
      dueDate: "2025-01-10",
      status: "done",
      estimatedTime: "20 min",
      completedDate: "2025-01-09",
      category: "Onboarding"
    },
    {
      id: 9,
      title: "IT Equipment Setup",
      description: "Configure laptop and access company systems",
      employer: "MegaCorp Ltd.",
      priority: "High",
      dueDate: "2024-12-20",
      status: "done",
      estimatedTime: "45 min",
      completedDate: "2024-12-18",
      category: "IT Setup"
    }
  ];

  const [selectedTask, setSelectedTask] = useState<typeof tasks[0] | null>(null);

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

  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  // Date utility functions
  const isOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  const isDueSoon = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get task card styling based on due date
  const getTaskStyling = (task: typeof tasks[0]) => {
    if (task.status === 'done') {
      return 'border-l-green-500 bg-white';
    }
    if (isOverdue(task.dueDate)) {
      return 'border-l-red-500 bg-red-50';
    }
    if (isDueSoon(task.dueDate)) {
      return 'border-l-orange-500 bg-orange-50';
    }
    if (task.status === 'in_progress') {
      return 'border-l-blue-500 bg-blue-50';
    }
    return 'border-l-gray-300 bg-white';
  };

  const getDateStyling = (task: typeof tasks[0]) => {
    if (task.status === 'done') {
      return 'text-green-600';
    }
    if (isOverdue(task.dueDate)) {
      return 'text-red-600 font-semibold';
    }
    if (isDueSoon(task.dueDate)) {
      return 'text-orange-600 font-semibold';
    }
    return 'text-gray-500';
  };

  const openTaskDetails = (task: typeof tasks[0]) => {
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  // Task Card Component
  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <div 
      className={`card border-l-4 ${getTaskStyling(task)} cursor-pointer hover:shadow-md transition-all active:scale-98`}
      onClick={() => openTaskDetails(task)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-2">
            {task.status === 'done' && (
              <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {task.status === 'in_progress' && (
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {task.title}
            </h3>
          </div>
          
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 truncate mr-2">
              📍 {task.employer}
            </span>
            <span className={`text-xs font-medium ${getDateStyling(task)} flex-shrink-0`}>
              {task.status === 'done' ? 
                `✅ ${formatDate(task.completedDate || task.dueDate)}` : 
                `📅 ${formatDate(task.dueDate)}`
              }
              {isOverdue(task.dueDate) && task.status !== 'done' && (
                <span className="ml-1 text-red-600">• Overdue</span>
              )}
              {isDueSoon(task.dueDate) && task.status !== 'done' && (
                <span className="ml-1 text-orange-600">• Due Soon</span>
              )}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              ⏱️ {task.estimatedTime}
            </span>
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Tasks</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>{todoTasks.length} To Do</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>{inProgressTasks.length} In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>{doneTasks.length} Done</span>
            </div>
          </div>
        </header>

        {/* To Do Tasks */}
        {todoTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-4 h-4 bg-red-500 rounded-full mr-3"></span>
              To Do ({todoTasks.length})
            </h2>
            <div className="space-y-3">
              {todoTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}

        {/* In Progress Tasks */}
        {inProgressTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
              In Progress ({inProgressTasks.length})
            </h2>
            <div className="space-y-3">
              {inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}

        {/* Done Tasks */}
        {doneTasks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              Done ({doneTasks.length})
            </h2>
            <div className="space-y-3">
              {doneTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}

        {/* Task Details Modal */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
            <div className="bg-white rounded-t-lg sm:rounded-lg w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Task Details</h3>
                <button 
                  onClick={closeTaskDetails}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{selectedTask.title}</h4>
                  <p className="text-gray-600 mb-4">{selectedTask.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Employer</span>
                    <p className="font-medium text-gray-900">{selectedTask.employer}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Category</span>
                    <p className="font-medium text-gray-900">{selectedTask.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Priority</span>
                    <p className="font-medium text-gray-900">{selectedTask.priority}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Estimated Time</span>
                    <p className="font-medium text-gray-900">{selectedTask.estimatedTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Due Date</span>
                    <p className={`font-medium ${getDateStyling(selectedTask)}`}>
                      {formatDate(selectedTask.dueDate)}
                      {isOverdue(selectedTask.dueDate) && selectedTask.status !== 'done' && (
                        <span className="ml-2 text-red-600 text-xs">Overdue</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status</span>
                    <p className="font-medium">
                      {selectedTask.status === 'todo' && '📋 To Do'}
                      {selectedTask.status === 'in_progress' && '🔄 In Progress'}
                      {selectedTask.status === 'done' && '✅ Done'}
                    </p>
                  </div>
                </div>

                {selectedTask.status !== 'done' && (
                  <div className="pt-4 border-t border-gray-200">
                    <button className="btn-primary w-full">
                      {selectedTask.status === 'todo' ? 'Start Task' : 'Continue Task'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}