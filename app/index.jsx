import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import 'tailwindcss/tailwind.css';
import "../global.css";

export default function CurrencyConverter() {
  // Setting up state variables for user input and feedback
  const [baseCurrency, setBaseCurrency] = useState('CAD'); // Default base currency
  const [destinationCurrency, setDestinationCurrency] = useState(''); // Currency to convert to
  const [amount, setAmount] = useState(1); // Default amount to convert
  const [convertedAmount, setConvertedAmount] = useState(null); // Result after conversion
  const [loading, setLoading] = useState(false); // Loading spinner for API call
  const [error, setError] = useState(null); // Error message for invalid inputs or API issues

  // Function to fetch the currency conversion rate and calculate result
  const convertCurrency = async () => {
    const API_KEY = "fca_live_MZpCgAjfhTCvZq728vJPGow08zz7x1NWBcrN8j5G";
    setLoading(true); // Show loading spinner
    setError(null); // Clear any previous errors
    setConvertedAmount(null); // Clear previous result

    // Validate inputs
    if (!baseCurrency || !destinationCurrency) {
      setLoading(false);
      setError('Please enter both base and destination currency codes.');
      return;
    }
    if (amount <= 0) {
      setLoading(false);
      setError('Amount must be greater than zero.');
      return;
    }

    try {
      //https://freecurrencyapi.com/
      // API call to fetch latest currency rates based on base currency
      const response = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${baseCurrency}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate. Please check the currency codes.');
      }

      const data = await response.json();

      // Calculate converted amount if destination currency exists in response
      const rate = data.data[destinationCurrency.toUpperCase()];
      if (rate) {
        setConvertedAmount(rate * amount);
      } else {
        setError('Invalid destination currency code. Please check and try again.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <View className="flex-1 p-6 bg-purple-50">
      {/* App Header */}
      <View className="flex-row items-center justify-center mb-8">
        <Ionicons name="cash-outline" size={32} color="#4F46E5" />
        <Text className="text-3xl font-bold text-indigo-700 ml-2">
          Currency Converter
        </Text>
      </View>

      {/* Input Fields */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-700 mb-2">Base Currency</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 text-lg mb-4"
          placeholder="e.g., CAD"
          value={baseCurrency}
          onChangeText={setBaseCurrency}
          autoCapitalize="characters"
        />

        <Text className="text-lg font-semibold text-gray-700 mb-2">Destination Currency</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 text-lg mb-4"
          placeholder="e.g., USD"
          value={destinationCurrency}
          onChangeText={setDestinationCurrency}
          autoCapitalize="characters"
        />

        <Text className="text-lg font-semibold text-gray-700 mb-2">Amount</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 text-lg"
          placeholder="Enter Amount"
          value={String(amount)}
          keyboardType="numeric"
          onChangeText={(text) => setAmount(parseFloat(text) || 0)} // Ensures valid numeric input
        />
      </View>

      {/* Convert Button */}
      <TouchableOpacity
        onPress={convertCurrency}
        className={`bg-indigo-600 rounded-lg py-4 ${loading ? 'opacity-70' : ''}`}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white text-center text-lg font-semibold">Convert</Text>
        )}
      </TouchableOpacity>

      {/* Display Conversion Result or Error */}
      {convertedAmount !== null && (
        <View className="mt-8 bg-green-50 p-4 rounded-lg border border-green-200">
          <Text className="text-2xl font-medium text-green-700 text-center">
            {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {destinationCurrency}
          </Text>
        </View>
      )}
      {error && (
        <Text className="text-red-600 text-center mt-6 text-md font-medium">
          {error}
        </Text>
      )}
    </View>
  );
}
