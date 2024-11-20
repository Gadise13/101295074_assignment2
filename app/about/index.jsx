import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import "tailwindcss/tailwind.css";
import "../../global.css"


export default function AboutScreen() {
  return (
    <View className="flex-1 p-6 bg-purple-50 items-center justify-center p-8">
      <Text className="text-2xl font-bold text-indigo-800 mb-5 text-center">
        <Ionicons name="information-circle-outline" size={24} color="#6C63FF" /> About
      </Text>
      <View className="w-11/12 bg-white rounded-lg p-8 shadow-md mb-5">
        <Text className="text-lg text-indigo-800 font-semibold mt-2 mb-2">Course Information</Text>
        <Text className="text-base text-black-800 mb-4">Mobile Application Development</Text>
        <Text className="text-base text-black-800 mb-4">Comp3074</Text>
        <Text className="text-base text-black-800 mb-6">Assignment 2</Text>

        <Text className="text-lg text-indigo-800 font-semibold mt-2 mb-2">Student Information</Text>
        <Text className="text-base text-gray-900 mb-4">Student Name: Gadise Oli</Text>
        <Text className="text-base text-gray-900 mb-4">Student ID: 101295074</Text>
      </View>
    </View>
  );
}
