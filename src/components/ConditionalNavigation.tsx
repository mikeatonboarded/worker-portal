'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from './navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Don't show navigation on auth pages or while loading
  const isAuthPage = pathname.startsWith('/auth');
  const isLandingPage = pathname === '/';
  
  if (isLoading || isAuthPage || (isLandingPage && !isAuthenticated)) {
    return null;
  }
  
  // Only show navigation if authenticated
  if (isAuthenticated) {
    return <Navigation />;
  }
  
  return null;
}