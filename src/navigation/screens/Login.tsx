import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { useSSO, useUser } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";

export default function Login() {
  // Warm up the browser for better UX (preloads browser)
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } =
        await startSSOFlow({
          strategy: "oauth_google",
        });

     

      if (setActive && createdSessionId) {
        // User successfully signed in
        await setActive({ session: createdSessionId });
        
        if (Platform.OS === "android") {
          ToastAndroid.show("Signed in successfully!", ToastAndroid.SHORT);
        }
      }
    } catch (err: any) {
      // Handle errors
      const errorMessage = err?.errors?.[0]?.message || "Failed to sign in";

      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      } else {
        Alert.alert("Error", errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* BRAND SECTION */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>spotlight</Text>
        <Text style={styles.tagline}>don&apos;t miss anything</Text>
      </View>

      {/* ILLUSTRATION */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/auth-bg-2.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* LOGIN SECTION */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={[
            styles.googleButton,
            isLoading && styles.googleButtonDisabled,
          ]}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.surface} />
          ) : (
            <>
              <View style={styles.googleIconContainer}>
                <Ionicons name="logo-google" size={20} color={COLORS.surface} />
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
