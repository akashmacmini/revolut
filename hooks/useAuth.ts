import { useCallback, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const { session, user, loading, initialized, signIn, verifyOtp, signOut, initialize } =
    useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  const isAuthenticated = !!session;

  const checkSession = useCallback((): boolean => {
    if (!session) return false;
    // Check if session is expired
    if (session.expires_at) {
      const expiresAt = new Date(session.expires_at * 1000);
      return expiresAt > new Date();
    }
    return true;
  }, [session]);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const requireAuth = useCallback(
    (router: ReturnType<typeof useRouter>) => {
      if (!isAuthenticated) {
        router.replace('/(auth)/splash');
        return false;
      }
      return true;
    },
    [isAuthenticated]
  );

  return {
    session,
    user,
    loading,
    initialized,
    isAuthenticated,
    checkSession,
    signIn,
    verifyOtp,
    signOut: handleSignOut,
    requireAuth,
  };
}
