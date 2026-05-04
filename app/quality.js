import { LogBox } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';

LogBox.ignoreLogs(['collapse']);

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Quality() {
  const router = useRouter();

  const [stage, setStage] = useState('checking'); 
  // stages: checking → bad → good

  useEffect(() => {
    // 1️⃣ Checking (5s)
    const checkingTimer = setTimeout(() => {
      setStage('bad');
    }, 5000);

    return () => clearTimeout(checkingTimer);
  }, []);

  useEffect(() => {
    if (stage === 'bad') {
      // 2️⃣ Bad Quality (5s)
      const badTimer = setTimeout(() => {
        setStage('good');
      }, 5000);

      return () => clearTimeout(badTimer);
    }

    if (stage === 'good') {
      // 3️⃣ Good Quality (5s) → Result
      const goodTimer = setTimeout(() => {
        router.replace('/result');
      }, 5000);

      return () => clearTimeout(goodTimer);
    }
  }, [stage]);

  return (
    <ScreenBackground>
    <View style={styles.container}>

      {/* CHECKING QUALITY */}
      {stage === 'checking' && (
        <View style={styles.center}>
          <View style={styles.iconCircleBlue}>
            <Ionicons name="scan-outline" size={56} color="#1D4ED8" />
          </View>

          <Text style={styles.title}>Checking Image Quality</Text>
          <Text style={styles.sub}>
            Please wait while we analyze your image...
          </Text>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>
       
      )}

      {/* LOW QUALITY */}
      {stage === 'bad' && (
        <View style={styles.center}>
          <View style={styles.iconCircleRed}>
            <Ionicons name="warning-outline" size={56} color="#B91C1C" />
          </View>

          <Text style={[styles.title, { color: '#B91C1C' }]}>
            Low Image Quality
          </Text>

          <Text style={styles.sub}>
            The image quality is too low for accurate detection.
          </Text>

          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>Tips for better quality:</Text>
            <Text style={styles.tip}>• Ensure good lighting</Text>
            <Text style={styles.tip}>• Focus clearly on the plant</Text>
            <Text style={styles.tip}>• Avoid blurry images</Text>
            <Text style={styles.tip}>• Capture from closer distance</Text>
          </View>

          <Text style={styles.sub}>Re-checking image quality...</Text>
        </View>
      )}

      {/* GOOD QUALITY */}
      {stage === 'good' && (
        <View style={styles.center}>
          <View style={styles.iconCircleGreen}>
            <Ionicons name="checkmark-circle-outline" size={64} color="#15803D" />
          </View>

          <Text style={[styles.title, { color: '#15803D' }]}>
            Quality Check Passed!
          </Text>

          <Text style={styles.sub}>
            Your image has good quality.
          </Text>
          <Text style={styles.sub}>
            Proceeding to analysis...
          </Text>
        </View>
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
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  iconCircleBlue: {
    backgroundColor: '#DBEAFE',
    padding: 28,
    borderRadius: 80,
    marginBottom: 20,
  },
  iconCircleRed: {
    backgroundColor: '#FEE2E2',
    padding: 28,
    borderRadius: 80,
    marginBottom: 20,
  },
  iconCircleGreen: {
    backgroundColor: '#DCFCE7',
    padding: 28,
    borderRadius: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F172A',
    textAlign: 'center',
  },
  sub: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressTrack: {
    width: '70%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#1D4ED8',
  },
  tipBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 14,
    padding: 16,
    marginVertical: 16,
    width: '100%',
  },
  tipTitle: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#7F1D1D',
  },
  tip: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 4,
  },
});
