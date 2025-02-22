import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue'
      }}
    >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome5 size={20} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name='customer'
          options={{
            title: 'Customer',
            tabBarIcon: ({ color }) => <FontAwesome5 size={20} name="users" color={color} />,
          }}
        />
        <Tabs.Screen
          name='product'
          options={{
            title: 'Product',
            tabBarIcon: ({ color }) => <Octicons size={20} name="container" color={color} />,
          }}
        />
    </Tabs>
  )
}