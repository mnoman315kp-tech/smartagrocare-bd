import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react'; // ✅ ADD THIS
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import { Colors } from '../constants/theme';
import { insertHistory } from './databaseFunctions'; // ✅ ADD THIS

export default function Home() {
  const router = useRouter();

  // ✅ TEST SQLITE INSERT (RUNS ON APP START)
  useEffect(() => {
    insertHistory(
      "Tomato Leaf Spot",
      0.91,
      "image.jpg",
      new Date().toISOString()
    );
  }, []);

  return (
    <ScreenBackground>
      <View style={styles.container}>
        
        {/* Logo */}
        <View style={styles.logoCircle}>
          <Ionicons name="leaf" size={40} color="#fff" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Plant Disease Detection</Text>
        <Text style={styles.subtitle}>
          Identify plant diseases quickly and accurately
        </Text>

        {/* Buttons */}
        <Pressable style={styles.primaryBtn} onPress={() => router.push('/login')}>
          <Text style={styles.primaryText}>Login</Text>
        </Pressable>

        <Pressable style={styles.outlineBtn} onPress={() => router.push('/signup')}>
          <Text style={styles.outlineText}>Sign Up</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Protect your plants with AI-powered detection
        </Text>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  logoCircle: {
    backgroundColor: Colors.light.tint,
    padding: 22,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
  primaryBtn: {
    backgroundColor: Colors.light.tint,
    width: '100%',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderColor: Colors.light.tint,
    width: '100%',
    padding: 14,
    borderRadius: 12,
  },
  outlineText: {
    color: Colors.light.tint,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    marginTop: 30,
    color: '#6B7280',
    fontSize: 13,
    textAlign: 'center',
  },
});