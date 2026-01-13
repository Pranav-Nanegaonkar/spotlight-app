import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function NotificationScreen({ navigation }: any) {
  const { isLoaded, isSignedIn, user } = useUser();

  // console.log("-----------------USER: ", user);

  return (
    <View>
      {isLoaded && user && (
        <View>
          <Text>{user.fullName}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
