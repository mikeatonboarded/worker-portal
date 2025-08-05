'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Documents() {
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

  const documents = [
    {
      id: 1,
      name: "W-4 Tax Form",
      type: "PDF",
      size: "245 KB",
      employer: "TechCorp Inc.",
      status: "pending",
      uploadedDate: null,
      dueDate: "Jan 15, 2025",
      required: true
    },
    {
      id: 2,
      name: "Photo ID Copy",
      type: "Image",
      size: null,
      employer: "TechCorp Inc.",
      status: "pending",
      uploadedDate: null,
      dueDate: "Jan 15, 2025",
      required: true
    },
    {
      id: 3,
      name: "Direct Deposit Form",
      type: "PDF",
      size: "180 KB",
      employer: "StartupXYZ",
      status: "uploaded",
      uploadedDate: "Dec 28, 2024",
      dueDate: "Jan 20, 2025",
      required: true
    },
    {
      id: 4,
      name: "Emergency Contact Form",
      type: "PDF",
      size: "120 KB",
      employer: "TechCorp Inc.",
      status: "approved",
      uploadedDate: "Dec 25, 2024",
      dueDate: "Jan 18, 2025",
      required: true
    },
    {
      id: 5,
      name: "Resume",
      type: "PDF",
      size: "350 KB",
      employer: "MegaCorp Ltd.",
      status: "approved",
      uploadedDate: "Dec 20, 2024",
      dueDate: null,
      required: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'uploaded':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'image':
        return '🖼️';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📎';
    }
  };

  const pendingDocs = documents.filter(doc => doc.status === 'pending');
  const uploadedDocs = documents.filter(doc => doc.status === 'uploaded');
  const approvedDocs = documents.filter(doc => doc.status === 'approved');

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Documents</h1>
          <p className="text-gray-600">Manage your onboarding documents</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>{pendingDocs.length} pending</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>{uploadedDocs.length} uploaded</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>{approvedDocs.length} approved</span>
            </div>
          </div>
        </header>

        {/* Upload Area */}
        <div className="card mb-6 sm:mb-8 border-2 border-dashed border-gray-300 hover:border-primary-400 transition-colors">
          <div className="text-center py-6">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
            <p className="text-gray-600 text-sm mb-4">Drag and drop files here or click to browse</p>
            <button className="btn-primary">
              Choose Files
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
            </p>
          </div>
        </div>

        {/* Document Categories */}
        <div className="space-y-6 sm:space-y-8">
          {/* Pending Documents */}
          {pendingDocs.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                Pending Upload ({pendingDocs.length})
              </h2>
              <div className="grid gap-4">
                {pendingDocs.map((doc) => (
                  <div key={doc.id} className="card border-l-4 border-l-yellow-500">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start sm:items-center mb-3 sm:mb-0">
                        <div className="text-2xl mr-4 mt-1 sm:mt-0">{getFileIcon(doc.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{doc.name}</h3>
                          <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
                            <span>📍 {doc.employer}</span>
                            {doc.dueDate && <span>📅 Due: {doc.dueDate}</span>}
                            {doc.required && (
                              <span className="text-red-600 font-medium">* Required</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                        <button className="btn-primary text-sm">
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Uploaded Documents */}
          {uploadedDocs.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                Under Review ({uploadedDocs.length})
              </h2>
              <div className="grid gap-4">
                {uploadedDocs.map((doc) => (
                  <div key={doc.id} className="card border-l-4 border-l-blue-500">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start sm:items-center mb-3 sm:mb-0">
                        <div className="text-2xl mr-4 mt-1 sm:mt-0">{getFileIcon(doc.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{doc.name}</h3>
                          <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
                            <span>📍 {doc.employer}</span>
                            <span>📤 Uploaded: {doc.uploadedDate}</span>
                            <span>📦 {doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                        <button className="btn-secondary text-sm">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approved Documents */}
          {approvedDocs.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Approved ({approvedDocs.length})
              </h2>
              <div className="grid gap-4">
                {approvedDocs.map((doc) => (
                  <div key={doc.id} className="card border-l-4 border-l-green-500">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start sm:items-center mb-3 sm:mb-0">
                        <div className="text-2xl mr-4 mt-1 sm:mt-0">{getFileIcon(doc.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h3 className="font-semibold text-gray-900 mr-2">{doc.name}</h3>
                            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
                            <span>📍 {doc.employer}</span>
                            <span>✅ Approved: {doc.uploadedDate}</span>
                            <span>📦 {doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                        <button className="btn-secondary text-sm">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {documents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-600">Your onboarding documents will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}