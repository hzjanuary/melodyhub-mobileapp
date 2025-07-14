import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import EventListScreen from '../screens/EventListScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Melody Hub' }}
      />
      <Stack.Screen name="Events" component={EventListScreen} options={{ title: 'Danh Sách Sự Kiện' }} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: 'Chi tiết sự kiện' }} />
    </Stack.Navigator>
  );
}
