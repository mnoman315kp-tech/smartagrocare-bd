import { StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';

export default function Processing() {
  return (
    <ScreenBackground>
    <View style={styles.container}>

      {/* Loader */}
      <View style={styles.loaderContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerDot} />
          <View style={[styles.innerDot, styles.dot2]} />
          <View style={[styles.innerDot, styles.dot3]} />
          <View style={[styles.innerDot, styles.dot4]} />
        </View>
      </View>

      {/* Text */}
      <Text style={styles.title}>Checking Image Quality</Text>
      <Text style={styles.subtitle}>
        Please wait while we analyze your image...
      </Text>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

    </View>
    </ScreenBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  /* Loader */
  loaderContainer: {
    marginBottom: 30,
  },

  outerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E6F4EA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
    top: 8,
  },

  dot2: {
    right: 8,
    top: '50%',
  },

  dot3: {
    bottom: 8,
  },

  dot4: {
    left: 8,
    top: '50%',
  },

  /* Text */
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 28,
  },

  /* Progress bar */
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    width: '65%',   // static for UI demo
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 10,
  },
});
