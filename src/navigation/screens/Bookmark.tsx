import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getItem } from "expo-secure-store";

export default function BookmarkScreen() {
  const data = getItem("user");
  const user = JSON.parse(data!);

  console.log(user);

  return (
    <View>
      <Text>{user.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
