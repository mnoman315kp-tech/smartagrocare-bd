import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import { Colors } from '../constants/theme';

export default function Result() {
  const router = useRouter();

  // 🔄 loader animation
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [showResult, setShowResult] = useState(false);

  // ✅ Dummy detection data (UNCHANGED)
  const result = {
    disease: 'Tomato Leaf Blight',
    confidence: 92,
    severity: 'moderate',
  };

  const severityColor = {
    healthy: '#15803D',
    mild: '#CA8A04',
    moderate: '#EA580C',
    severe: '#B91C1C',
  };

  useEffect(() => {
    // Rotate animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Show result after analysis
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScreenBackground>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <Text style={styles.headerTitle}>Detection Result</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 🔄 ANALYZING IMAGE UI */}
      {!showResult && (
        <View style={styles.analysisBox}>
          <View style={styles.loaderCircle}>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Ionicons name="sync" size={36} color={Colors.light.tint} />
            </Animated.View>
          </View>

          <Text style={styles.analysisTitle}>Analyzing Image</Text>
          <Text style={styles.analysisSub}>
            Our AI is detecting plant diseases...
          </Text>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.percent}>90%</Text>
        </View>
      )}

      {/* ✅ RESULT UI (UNCHANGED) */}
      {showResult && (
        <>
          <View
            style={[
              styles.card,
              { borderColor: severityColor[result.severity] },
            ]}
          >
            <Ionicons
              name="leaf"
              size={36}
              color={severityColor[result.severity]}
            />
            <Text style={styles.label}>Detected Disease</Text>
            <Text
              style={[
                styles.disease,
                { color: severityColor[result.severity] },
              ]}
            >
              {result.disease}
            </Text>

            <Text style={styles.confidence}>
              Confidence: {result.confidence}%
            </Text>
          </View>

          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.push('/recommendation')}
          >
            <Text style={styles.primaryText}>View Treatment</Text>
          </Pressable>
        </>
      )}
    </View>
    </ScreenBackground>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 24,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  /* 🔄 ANALYSIS UI */
  analysisBox: {
    marginTop: 60,
    alignItems: 'center',
  },
  loaderCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  analysisSub: {
    color: '#6B7280',
    marginBottom: 20,
  },
  progressTrack: {
    width: '80%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    width: '90%',
    height: '100%',
    backgroundColor: Colors.light.tint,
    borderRadius: 6,
  },
  percent: {
    marginTop: 8,
    fontWeight: '600',
    color: '#374151',
  },

  /* RESULT CARD */
  card: {
    marginTop: 40,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  label: {
    marginTop: 12,
    color: '#6B7280',
  },
  disease: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 6,
  },
  confidence: {
    color: '#374151',
    marginTop: 6,
  },
  primaryBtn: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 14,
    marginTop: 40,
  },
  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
