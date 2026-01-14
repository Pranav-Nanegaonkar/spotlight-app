import { CreateUserInSupabase } from "@/supabase/user";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function HomeScreen({ navigation }: any) {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    isSignedIn ?"":
      (async () => {
        await CreateUserInSupabase({
          clerkId: user?.id,
          email: user?.primaryEmailAddress?.emailAddress,
          fullName: user?.fullName,
          imageUrl: user?.imageUrl,
          // username: "dummy",
        });
      })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Edit src/navigation/screens/Home.tsx to edit this screen.</Text>
      <Button
        title="go to notifications"
        onPress={() => navigation.navigate("Notification")}
      />
      <Button title="logout" onPress={() => signOut()} />
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
