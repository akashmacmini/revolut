import { useState, useEffect, useCallback } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

type BiometricType = 'faceid' | 'fingerprint' | 'none';

interface BiometricsState {
  isAvailable: boolean;
  isEnrolled: boolean;
  biometricType: BiometricType;
  loading: boolean;
}

export function useBiometrics() {
  const [state, setState] = useState<BiometricsState>({
    isAvailable: false,
    isEnrolled: false,
    biometricType: 'none',
    loading: true,
  });

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = useCallback(async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

      let biometricType: BiometricType = 'none';
      if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        biometricType = 'faceid';
      } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        biometricType = 'fingerprint';
      }

      setState({
        isAvailable: compatible,
        isEnrolled: enrolled,
        biometricType,
        loading: false,
      });
    } catch {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const authenticate = useCallback(
    async (promptMessage = 'Authenticate to continue'): Promise<boolean> => {
      if (!state.isAvailable || !state.isEnrolled) return false;

      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage,
          cancelLabel: 'Cancel',
          disableDeviceFallback: false,
        });
        return result.success;
      } catch {
        return false;
      }
    },
    [state.isAvailable, state.isEnrolled]
  );

  return {
    ...state,
    authenticate,
    checkBiometrics,
  };
}
