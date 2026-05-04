/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import ScreenBackground from "../components/ScreenBackground";
import { Colors } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

// Firebase Imports
import { auth, db } from "../Config/Firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;

      console.log("Fetching user data for:", user?.email); // Debug log

      if (user) {
        setUserEmail(user.email);

        const nameFromEmail = user.email.split("@")[0];
        setUserName(nameFromEmail);
      } else {
        router.replace("/login");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("Profile screen focused - refreshing data");
      fetchUserData();
    }, []),
  );

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await signOut(auth);
            // Clear current data
            setUserName("");
            setUserEmail("");
            router.replace("/login");
          } catch (error) {
            Alert.alert("Error", "Failed to logout");
            setLoading(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <ScreenBackground>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ScreenBackground>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScreenBackground>
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
          {/* Back Button */}
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </Pressable>

          <View style={styles.profileHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {userName && userName.length > 0
                  ? userName.charAt(0).toUpperCase()
                  : "?"}
              </Text>
            </View>
            <Text style={styles.userName}>{userName || "User"}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons
                name="person-outline"
                size={24}
                color={Colors.light.tint}
              />
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>{userName || "Not set"}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons
                name="mail-outline"
                size={24}
                color={Colors.light.tint}
              />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{userEmail}</Text>
            </View>
          </View>

          {/* Logout Button */}
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </Pressable>
      </ScreenBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "transparent",
  },
  back: {
    marginTop: 30,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#64748B",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    marginLeft: 10,
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: "#64748B",
    flex: 1,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.light.tint,
  },
});
