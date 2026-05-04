import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import { Colors } from '../constants/theme';

export default function About() {
  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>About This App</Text>

        <Text style={styles.text}>
          This Plant Disease Detection application helps farmers, gardeners,
          and agriculture enthusiasts identify plant diseases quickly and
          accurately using AI-powered image analysis.
        </Text>

        <Text style={styles.text}>
          Simply capture or upload an image of a plant leaf, and the system
          analyzes it to detect possible diseases, their severity, and
          recommended treatments.
        </Text>

        <Text style={styles.subtitle}>Key Features</Text>

        <Text style={styles.bullet}>• AI-based plant disease detection</Text>
        <Text style={styles.bullet}>• Support for multiple plant types</Text>
        <Text style={styles.bullet}>• Clear treatment recommendations</Text>
        <Text style={styles.bullet}>• Easy-to-use and farmer friendly</Text>

        <Text style={styles.text}>
          Our goal is to support sustainable agriculture and reduce crop loss
          by providing fast and reliable plant health insights.
        </Text>

        {/* Bottom spacing */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </ScreenBackground>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,

    // ✅ REQUIRED so global background image is visible
    backgroundColor: 'transparent',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.tint,
    marginBottom: 12,
  },

  subtitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },

  text: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },

  bullet: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
});
