import { CreateUserInSupabase } from "@/supabase/user";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import {setItemAsync} from "expo-secure-store";
export default function HomeScreen({ navigation }: any) {
  const { signOut, isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const [userCreated, setUserCreated] = useState(false);

  useEffect(() => {
    const createUser = async () => {
      // Only proceed if:
      // 1. User data is loaded
      // 2. User exists
      // 3. We haven't already created the user
      if (isLoaded && user && !userCreated) {
        try {
          const { user: userData } = await CreateUserInSupabase({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            fullName: user.fullName,
            imageUrl: user.imageUrl,
          });
          setUserCreated(true);

          await setItemAsync("user", JSON.stringify(userData));

        } catch (error) {
          console.error("Error creating user in Supabase:", error);
        }
      }
    };

    createUser();
  }, [isLoaded, user, userCreated]);

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
