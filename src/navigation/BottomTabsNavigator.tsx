// src/navigation/BottomTabsNavigator.tsx

// Dependencies ...
import React from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../hooks/useAppTheme';

import DashboardScreen from '../screens/DashboardScreen';
import OrdersScreen from '../screens/OrdersScreen';
import UsersScreen from '../screens/UsersScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Tab param list for TypeScript
export type TabParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Users: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function BottomTabsNavigator() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.headerBackground },
        headerTintColor: colors.text,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          paddingLeft: 4,
        },
        tabBarStyle: {
          height: insets.bottom + 68,
          paddingTop: 6,
          paddingBottom: insets.bottom,
          paddingHorizontal: 20,
          borderTopWidth: 0,
          backgroundColor: colors.tabBarBackground,
        },
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          let iconSize = 20;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              iconSize = 19;
              break;
            case 'Orders':
              iconName = focused ? 'grid' : 'grid-outline'; // grid or clipboard so far
              iconSize = 19;
              break;
            case 'Users':
              iconName = focused ? 'people' : 'people-outline';
              iconSize = 23;
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              iconSize = 19;
              break;
          }

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 8, paddingVertical: 8 }}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={colors.text}
              style={{ marginTop: 2, marginLeft: 12 }}
            />
          </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 8, paddingVertical: 8 }}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={colors.text}
              style={{ marginTop: 2, marginLeft: 12 }}
            />
          </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 8, paddingVertical: 8 }}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={colors.text}
              style={{ marginTop: 2, marginLeft: 12 }}
            />
          </Pressable>
          ),
        })}
      />
    </Tab.Navigator>
  );
}