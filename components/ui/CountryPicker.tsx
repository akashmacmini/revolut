import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/constants';
import { countries, Country, CountryCode } from '../../lib/countries';

interface CountryPickerProps {
  selected?: CountryCode;
  onSelect: (country: Country) => void;
  visible: boolean;
  onClose: () => void;
}

export function CountryPicker({
  selected,
  onSelect,
  visible,
  onClose,
}: CountryPickerProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dialCode.includes(q)
    );
  }, [search]);

  const handleSelect = (country: Country) => {
    onSelect(country);
    onClose();
    setSearch('');
  };

  const renderItem = ({ item }: { item: Country }) => {
    const isSelected = item.code === selected;
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        className={`flex-row items-center px-5 py-3.5 ${
          isSelected ? 'bg-surface-light' : ''
        }`}
        activeOpacity={0.6}
      >
        <Text className="text-2xl mr-3">{item.flag}</Text>
        <Text className="text-text-primary text-base flex-1">
          {item.name}
        </Text>
        <Text className="text-text-secondary text-sm">{item.dialCode}</Text>
        {isSelected && (
          <Ionicons
            name="checkmark"
            size={20}
            color={Colors.primary}
            style={{ marginLeft: 8 }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-3">
          <Text className="text-text-primary text-lg font-semibold">
            Select Country
          </Text>
          <TouchableOpacity onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="px-5 pb-3">
          <View className="flex-row items-center bg-surface rounded-xl px-4 h-11">
            <Ionicons
              name="search"
              size={18}
              color={Colors.textTertiary}
              style={{ marginRight: 8 }}
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search countries..."
              placeholderTextColor={Colors.textTertiary}
              className="flex-1 text-text-primary text-base"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.code}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={20}
          maxToRenderPerBatch={20}
        />
      </SafeAreaView>
    </Modal>
  );
}
