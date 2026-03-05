import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/lib/constants';

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

const tabs: { name: string; title: string; icon: TabIconName; iconFocused: TabIconName }[] = [
  { name: 'index', title: 'Home', icon: 'home-outline', iconFocused: 'home' },
  { name: 'cards', title: 'Cards', icon: 'card-outline', iconFocused: 'card' },
  { name: 'crypto', title: 'Crypto', icon: 'logo-bitcoin', iconFocused: 'logo-bitcoin' },
  { name: 'hub', title: 'Hub', icon: 'grid-outline', iconFocused: 'grid' },
  { name: 'revpoints', title: 'RevPoints', icon: 'star-outline', iconFocused: 'star' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 0.5,
          height: 85,
          paddingBottom: 30,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.icon}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
