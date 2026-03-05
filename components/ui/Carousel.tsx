import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  FlatList,
  useWindowDimensions,
  ViewToken,
} from 'react-native';

interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

interface CarouselProps {
  data: CarouselItem[];
  onIndexChange?: (index: number) => void;
}

export function Carousel({ data, onIndexChange }: CarouselProps) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        const idx = viewableItems[0].index;
        setActiveIndex(idx);
        onIndexChange?.(idx);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = useCallback(
    ({ item }: { item: CarouselItem }) => (
      <View style={{ width }}>{item.content}</View>
    ),
    [width]
  );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />

      {/* Pagination dots */}
      {data.length > 1 && (
        <View className="flex-row items-center justify-center mt-4 gap-2">
          {data.map((_, i) => (
            <View
              key={i}
              className={`rounded-full ${
                i === activeIndex
                  ? 'w-2.5 h-2.5 bg-primary'
                  : 'w-2 h-2 bg-surface-light'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
