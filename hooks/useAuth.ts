import { useAppSelector } from '../store';
import { selectAuth, selectAuthError, selectIsAuthenticated, selectIsLoading, selectUser } from '../store/slices/authSlice';

/**
 * Custom hook for authentication state
 * Provides easy access to auth state throughout the app
 */
export const useAuth = () => {
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectAuthError);

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    auth,
    
    // Computed values
    isLoggedIn: isAuthenticated && !!user,
    userRoles: user?.roles || [],
    isStudent: user?.roles?.includes('Student') || false,
    isTeacher: user?.roles?.includes('Teacher') || false,
    isInstitution: user?.roles?.includes('Institution') || false,
    isSuperAdmin: user?.is_super_admin || false,
    fullName: user ? `${user.first_name} ${user.last_name}` : '',
  };
};
