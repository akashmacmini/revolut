import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/lib/constants';
import { StepHeader } from '@/components/layout/StepHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

const mockName = 'Alex Johnson';

interface OptionRowProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  color?: string;
}

function OptionRow({ icon, label, onPress, color = Colors.text }: OptionRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      className="flex-row items-center py-4"
    >
      <View
        style={{ backgroundColor: Colors.surfaceLight }}
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={{ color }} className="text-base font-medium">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ProfilePictureScreen() {
  const router = useRouter();
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const displayPhoto = selectedPhoto ?? currentPhoto;

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera access is needed to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedPhoto(result.assets[0].uri);
    }
  };

  const handleChooseFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Photo library access is needed to choose a photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedPhoto(result.assets[0].uri);
    }
  };

  const handleRemovePhoto = () => {
    Alert.alert('Remove photo', 'Are you sure you want to remove your profile photo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setCurrentPhoto(null);
          setSelectedPhoto(null);
        },
      },
    ]);
  };

  const handleSave = async () => {
    if (!selectedPhoto) return;

    setSaving(true);
    // Mock upload to Supabase Storage
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCurrentPhoto(selectedPhoto);
    setSelectedPhoto(null);
    setSaving(false);
    Alert.alert('Success', 'Profile photo updated!');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StepHeader title="Profile photo" onBack={() => router.back()} />

      <View className="flex-1 px-6 pt-8">
        {/* Current/preview photo */}
        <View className="items-center mb-8">
          {displayPhoto ? (
            <Image
              source={{ uri: displayPhoto }}
              style={{
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: Colors.surfaceLight,
              }}
            />
          ) : (
            <Avatar name={mockName} size="xl" />
          )}

          {selectedPhoto && (
            <Text className="text-primary text-sm mt-3 font-medium">
              Preview
            </Text>
          )}
        </View>

        {/* Options */}
        <View
          className="rounded-2xl px-4"
          style={{ backgroundColor: Colors.surface }}
        >
          <OptionRow
            icon="camera-outline"
            label="Take photo"
            onPress={handleTakePhoto}
          />
          <View className="h-px bg-border ml-13" />
          <OptionRow
            icon="images-outline"
            label="Choose from library"
            onPress={handleChooseFromLibrary}
          />
          {displayPhoto && (
            <>
              <View className="h-px bg-border ml-13" />
              <OptionRow
                icon="trash-outline"
                label="Remove photo"
                onPress={handleRemovePhoto}
                color={Colors.error}
              />
            </>
          )}
        </View>

        {/* Save button */}
        {selectedPhoto && (
          <View className="mt-auto mb-8">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={saving}
              onPress={handleSave}
            >
              Save
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
