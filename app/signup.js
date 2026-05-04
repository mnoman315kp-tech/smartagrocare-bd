import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import ScreenBackground from "../components/ScreenBackground";
import { Colors } from "../constants/theme";

// Firebase Imports
import { auth, db } from "../Config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    setGeneralError("");

    let valid = true;

    // Validation
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      // Create User in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Save minimal user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email.toLowerCase(),
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Account created successfully!");
      router.replace("/capture");
    } catch (error) {
      console.log("Signup Error:", error.code);

      if (error.code === "auth/email-already-in-use") {
        setGeneralError("This email is already registered. Please login.");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email address");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Password is too weak (min 6 characters)");
      } else {
        setGeneralError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScreenBackground>
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
          {/* Back Button */}
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </Pressable>

          <Text style={styles.header}>Create Account</Text>

          {/* Logo */}
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={40} color="#fff" />
          </View>

          {/* Email Input */}
          <TextInput
            placeholder="Email address"
            style={[styles.input, emailError ? styles.inputError : null]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={[
                styles.input,
                styles.passwordInput,
                passwordError ? styles.inputError : null,
              ]}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#64748B"
              />
            </Pressable>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          {/* Confirm Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              style={[
                styles.input,
                styles.passwordInput,
                confirmError ? styles.inputError : null,
              ]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={22}
                color="#64748B"
              />
            </Pressable>
          </View>
          {confirmError ? (
            <Text style={styles.errorText}>{confirmError}</Text>
          ) : null}

          {/* General Error */}
          {generalError ? (
            <Text style={styles.errorText}>{generalError}</Text>
          ) : null}

          {/* Signup Button */}
          <Pressable
            style={styles.primaryBtn}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.primaryText}>Create Account</Text>
            )}
          </Pressable>

          {/* Login Link */}
          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.link}>
              Already have an account?{" "}
              <Text style={styles.linkHighlight}>Login</Text>
            </Text>
          </Pressable>
        </Pressable>
      </ScreenBackground>
    </TouchableWithoutFeedback>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "transparent",
  },
  back: {
    marginTop: 30,
    alignSelf: "flex-start",
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0F172A",
  },
  logoCircle: {
    alignSelf: "center",
    backgroundColor: Colors.light.tint,
    padding: 25,
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 15,
    padding: 15,
    marginBottom: 5,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 5,
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: "40%",
    transform: [{ translateY: -12 }],
    padding: 4,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 8,
  },
  primaryBtn: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 17,
  },
  link: {
    textAlign: "center",
    marginTop: 24,
    color: "#64748B",
    fontSize: 15,
  },
  linkHighlight: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
});
