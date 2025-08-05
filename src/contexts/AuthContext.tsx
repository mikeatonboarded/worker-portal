'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, userData?: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthStatus = () => {
      try {
        const authStatus = localStorage.getItem('isAuthenticated');
        const userPhone = localStorage.getItem('userPhone');
        const userData = localStorage.getItem('userData');

        if (authStatus === 'true' && userPhone) {
          const parsedUserData = userData ? JSON.parse(userData) : {};
          setUser({
            phone: userPhone,
            ...parsedUserData
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (phone: string, userData: Partial<User> = {}) => {
    const user: User = {
      phone,
      ...userData
    };

    setUser(user);
    setIsAuthenticated(true);
    
    // Persist to localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userPhone', phone);
    if (Object.keys(userData).length > 0) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userData');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();

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
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}