import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import ScreenBackground from "../components/ScreenBackground";
import { Colors } from "../constants/theme";
import { auth } from "../Config/Firebase";
import { signOut } from "firebase/auth";

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been successfully logged out.");
      router.replace("/login"); 
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenBackground>
        <View style={styles.container}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </Pressable>

          <Text style={styles.header}>Logout</Text>

          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={50} color="#fff" />
          </View>

          <Text style={styles.message}>Are you sure you want to logout?</Text>

          <Pressable
            style={styles.logoutBtn}
            onPress={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.logoutText}>Yes, Logout</Text>
            )}
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </ScreenBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    position: "absolute",
    top: 50,
    left: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 40,
  },
  logoCircle: {
    backgroundColor: Colors.light.tint,
    padding: 30,
    borderRadius: 50,
    marginBottom: 40,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#64748B",
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  logoutBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 16,
    marginBottom: 20,
    width: "80%",
  },
  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
  cancelText: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "500",
  },
});
