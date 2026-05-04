/* eslint-disable react/no-unescaped-entities */
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import ScreenBackground from "../components/ScreenBackground";
import { Colors } from "../constants/theme";

// Firebase
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Config/Firebase"; //  make sure lowercase is correct

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ FINAL Google Auth Setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:"25448249891-1qbseftvu9q73euh0g3sp4sbr4je5nkg.apps.googleusercontent.com",
    androidClientId:"28627514158-1uukl1vb3ih6eedlsvv9ihn0kg4pa2sq.apps.googleusercontent.com",
    iosClientId:"25448249891-pk20mtejg410o3fvigk8k8kqapqtla09.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  // ✅ Handle Google Response
  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken;

      if (!idToken) {
        Alert.alert("Error", "Google token not found");
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken);

      setGoogleLoading(true);

      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Google Login Successful");
          router.replace("/select");
        })
        .catch((error) => {
          console.log("Google Login Error:", error);
          Alert.alert("Error", "Google login failed");
        })
        .finally(() => setGoogleLoading(false));
    }
  }, [response]);

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    let valid = true;

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      setEmail("");
      setPassword("");
      router.replace("/select");
    } catch (error) {
      console.log("Login Error:", error.code);

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setGeneralError("Invalid email or password");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email address");
      } else {
        setGeneralError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenBackground>
        <Pressable style={styles.container}>

          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </Pressable>

          <Text style={styles.header}>Login</Text>

          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={40} color="#fff" />
          </View>

          <TextInput
            placeholder="Email"
            style={[styles.input, emailError && styles.inputError]}
            value={email}
            onChangeText={setEmail}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={[
                styles.input,
                styles.passwordInput,
                passwordError && styles.inputError,
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

          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
          {generalError && <Text style={styles.errorText}>{generalError}</Text>}

          <Pressable
            style={styles.primaryBtn}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryText}>Login</Text>
            )}
          </Pressable>

          <Pressable onPress={() => router.push("/signup")}>
            <Text style={styles.link}>Create Account</Text>
          </Pressable>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <Pressable
            style={styles.googleBtn}
            onPress={() => promptAsync({ useProxy: true })}
            disabled={!request || googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text style={styles.googleText}>Continue with Google</Text>
              </>
            )}
          </Pressable>

        </Pressable>
      </ScreenBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  back: { marginTop: 30, alignSelf: "flex-start" },
  header: { textAlign: "center", fontSize: 22, fontWeight: "700", marginBottom: 10 },
  logoCircle: {
    alignSelf: "center",
    backgroundColor: Colors.light.tint,
    padding: 25,
    borderRadius: 50,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 15,
    padding: 15,
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  passwordContainer: { position: "relative" },
  passwordInput: { paddingRight: 50 },
  eyeIcon: { position: "absolute", right: 15, top: "40%" },
  inputError: { borderColor: "#EF4444" },
  errorText: { color: "#EF4444", marginBottom: 10 },
  primaryBtn: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  primaryText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  link: {
    textAlign: "center",
    marginTop: 15,
    color: Colors.light.tint,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  orText: { marginHorizontal: 10, color: "#64748B" },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },
  googleText: { fontSize: 15, fontWeight: "500" },
});