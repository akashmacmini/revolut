import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { Colors } from '@/lib/constants';

interface SafeAreaProps {
  children: ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
}

export function SafeArea({ children, edges, style }: SafeAreaProps) {
  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
