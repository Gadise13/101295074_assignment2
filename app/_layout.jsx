import React from 'react';
import { Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import "tailwindcss/tailwind.css";


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#6C63FF" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitleStyle: { fontFamily: "outfit-medium" },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = 'home-outline';
          } else if (route.name === 'about/index') {
            iconName="information-circle-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'outfit-medium',
        },
      })}
    />
  );
}
