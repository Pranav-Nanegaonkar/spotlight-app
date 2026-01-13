import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";

import TabNavigator from "./TabNavigator";
import LoginScreen from "./screens/Login";
import { COLORS } from "@/constants/theme";

const Stack = createNativeStackNavigator();

function Loader() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

export default function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  // const prints = {
  //   actor,
  //   getToken,
  //   has,
  //   isLoaded,
  //   isSignedIn,
  //   orgId,
  //   orgRole,
  //   orgSlug,
  //   sessionClaims,
  //   sessionId,
  //   signOut,
  //   userId,
  // };
  // console.log("LOGS: ", prints);

  //  Show loader while Clerk initializes
  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animation: "slide_from_left" }}
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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
