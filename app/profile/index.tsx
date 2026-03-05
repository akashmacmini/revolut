import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/lib/constants';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';

// Mock profile data
const mockProfile = {
  firstName: 'Alex',
  lastName: 'Johnson',
  revTag: '@alexjohnson',
  avatarUrl: null as string | null,
  plan: 'Free' as const,
  kycStatus: 'verified' as const,
};

type PlanType = 'Free' | 'Plus' | 'Premium' | 'Metal';

const planColors: Record<PlanType, string> = {
  Free: Colors.textSecondary,
  Plus: Colors.accent,
  Premium: Colors.primary,
  Metal: '#C0C0C0',
};

interface SettingsRowProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  color?: string;
  showChevron?: boolean;
}

function SettingsRow({ icon, label, onPress, color = Colors.text, showChevron = true }: SettingsRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      className="flex-row items-center py-3.5"
    >
      <View
        style={{ backgroundColor: Colors.surfaceLight }}
        className="w-9 h-9 rounded-xl items-center justify-center mr-3"
      >
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={{ color }} className="flex-1 text-base">
        {label}
      </Text>
      {showChevron && (
        <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const fullName = `${mockProfile.firstName} ${mockProfile.lastName}`;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="items-center pt-6 pb-4 px-4">
          <TouchableOpacity
            onPress={() => router.push('/profile/picture')}
            activeOpacity={0.7}
          >
            <Avatar uri={mockProfile.avatarUrl} name={fullName} size="xl" />
            <View
              style={{ backgroundColor: Colors.primary }}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full items-center justify-center border-2 border-background"
            >
              <Ionicons name="camera" size={14} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <Text className="text-text-primary text-xl font-bold mt-4">
            {fullName}
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/profile/revtag')}
            className="flex-row items-center mt-1"
            activeOpacity={0.7}
          >
            <Text className="text-text-secondary text-sm">
              {mockProfile.revTag}
            </Text>
            <Ionicons
              name="pencil"
              size={12}
              color={Colors.textSecondary}
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>

          {/* Plan badge */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center mt-3 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: Colors.surfaceLight }}
          >
            <View
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: planColors[mockProfile.plan] }}
            />
            <Text className="text-text-primary text-xs font-semibold mr-1">
              {mockProfile.plan}
            </Text>
            <Text className="text-primary text-xs font-semibold">
              Upgrade
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account section */}
        <View className="px-4 mt-4">
          <Text className="text-text-tertiary text-xs font-semibold uppercase mb-2 ml-1">
            Account
          </Text>
          <Card>
            <SettingsRow
              icon="person-outline"
              label="Personal details"
              onPress={() => {}}
            />
            <View className="h-px bg-border ml-12" />
            <SettingsRow
              icon="at"
              label="RevTag"
              onPress={() => router.push('/profile/revtag')}
            />
            <View className="h-px bg-border ml-12" />
            <SettingsRow
              icon="shield-checkmark-outline"
              label="Identity"
              onPress={() => {}}
            />
          </Card>
        </View>

        {/* Settings section */}
        <View className="px-4 mt-6">
          <Text className="text-text-tertiary text-xs font-semibold uppercase mb-2 ml-1">
            Settings
          </Text>
          <Card>
            <SettingsRow
              icon="settings-outline"
              label="App settings"
              onPress={() => {}}
            />
            <View className="h-px bg-border ml-12" />
            <SettingsRow
              icon="lock-closed-outline"
              label="Security"
              onPress={() => {}}
            />
            <View className="h-px bg-border ml-12" />
            <SettingsRow
              icon="eye-off-outline"
              label="Privacy"
              onPress={() => {}}
            />
          </Card>
        </View>

        {/* Support section */}
        <View className="px-4 mt-6">
          <Text className="text-text-tertiary text-xs font-semibold uppercase mb-2 ml-1">
            Support
          </Text>
          <Card>
            <SettingsRow
              icon="help-circle-outline"
              label="Help"
              onPress={() => {}}
            />
            <View className="h-px bg-border ml-12" />
            <SettingsRow
              icon="chatbubble-outline"
              label="Contact us"
              onPress={() => {}}
            />
          </Card>
        </View>

        {/* Sign out */}
        <View className="px-4 mt-6">
          <Card>
            <SettingsRow
              icon="log-out-outline"
              label="Sign out"
              onPress={() => {}}
              color={Colors.error}
              showChevron={false}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
