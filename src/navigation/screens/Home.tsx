import { Text, View, StyleSheet, Button } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Edit src/navigation/screens/Home.tsx to edit this screen.</Text>
      <Button
        title="go to notifications"
        onPress={() => navigation.navigate("Notification")}
      />
      <Button
        title="go to Bookmark"
        onPress={() => navigation.navigate("Bookmark")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
});
