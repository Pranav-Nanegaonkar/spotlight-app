import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "./screens/Notification";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TabNavigator from "./TabNavigator";
import LoginScreen from "./screens/Login";
import { useAuth } from "@clerk/clerk-expo";

const Stack = createNativeStackNavigator();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("MISSING PUBLISHABLE KEY SET ENV");
}

export default function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isSignedIn ? (
            <Stack.Screen name="index" component={TabNavigator} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
