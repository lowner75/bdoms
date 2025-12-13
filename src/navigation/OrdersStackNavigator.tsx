// Dependencies ...
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens ...
import { OrdersScreen } from '../screens/OrdersScreen';
import { OrderDetailsScreen } from '../screens/OrderDetailsScreen';

export type OrdersStackParamList = {
  OrdersList: undefined;
  OrderDetails: { orderId: string };
};

const Stack = createNativeStackNavigator<OrdersStackParamList>();

export function OrdersStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // 👈 native, smooth, free
      }}
    >
      <Stack.Screen
        name="OrdersList"
        component={OrdersScreen}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
      />
    </Stack.Navigator>
  );
}