import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function NotificationScreen({ navigation }: any) {
  return (
    <View>
      <Text onPress={() => navigation.goBack()}>Notification Screen</Text>
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
