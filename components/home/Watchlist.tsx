import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { seedWatchlist, WatchlistItemWithPrice } from '@/lib/seedData';
import { Colors } from '@/lib/constants';
import Svg, { Polyline } from 'react-native-svg';

function MiniSparkline({
  data,
  color,
  width = 60,
  height = 24,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  const points = data
    .map((val, i) => {
      const x = i * stepX;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Svg width={width} height={height}>
      <Polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

function WatchlistRow({ item }: { item: WatchlistItemWithPrice }) {
  const isPositive = item.change24h >= 0;
  const changeColor = isPositive ? Colors.success : Colors.error;
  const priceStr =
    item.type === 'commodity'
      ? item.price.toFixed(4)
      : `$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <TouchableOpacity className="flex-row items-center py-3">
      <View className="w-8 h-8 rounded-full bg-surface-light items-center justify-center mr-3">
        <Text className="text-text-primary text-xs font-bold">
          {item.symbol.substring(0, 2)}
        </Text>
      </View>

      <View className="flex-1">
        <Text className="text-text-primary text-sm font-medium">
          {item.name}
        </Text>
        <Text className="text-text-tertiary text-xs">{item.symbol}</Text>
      </View>

      <View className="mr-3">
        <MiniSparkline data={item.sparkline} color={changeColor} />
      </View>

      <View className="items-end">
        <Text className="text-text-primary text-sm font-medium">
          {priceStr}
        </Text>
        <Text
          className="text-xs"
          style={{ color: changeColor }}
        >
          {isPositive ? '+' : ''}
          {item.change24h.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function Watchlist() {
  return (
    <Card className="mx-4 mb-4">
      <Text className="text-text-primary text-base font-semibold mb-2">
        Watchlist
      </Text>
      {seedWatchlist.map((item) => (
        <WatchlistRow key={item.id} item={item} />
      ))}
    </Card>
  );
}
