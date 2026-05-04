import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import { Colors } from '../constants/theme';

export default function Recommendation() {
  const router = useRouter();

  const result = {
    disease: 'Powdery Mildew',
    chemical: [
      'Apply sulfur-based fungicide every 10 days',
      'Use potassium bicarbonate spray',
      'Treat with myclobutanil fungicide',
      'Apply azoxystrobin for severe cases',
    ],
    home: [
      'Mix milk with water (1:3 ratio) and spray regularly',
      'Use baking soda spray (1 tsp per liter water)',
      'Apply neem oil solution twice a week',
      'Spray garlic-onion extract for prevention',
    ],
    tips: [
      'Follow the treatment plan consistently for best results',
      'Monitor your plant daily for any changes',
      'Consult a plant specialist if symptoms worsen',
      'Keep affected plants isolated to prevent spread',
    ],
  };

  return (
    <ScreenBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push('/result')}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>
          <Text style={styles.headerTitle}>Treatment Recommendation</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* DETECTED DISEASE */}
        <View style={styles.detectedBox}>
          <Ionicons name="alert-circle-outline" size={20} color="#EA580C" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.detectedLabel}>Detected Disease</Text>
            <Text style={styles.detectedText}>{result.disease}</Text>
          </View>
        </View>

        {/* CHEMICAL TREATMENT */}
        <View style={[styles.section, styles.greenBg]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flask-outline" size={20} color="#16A34A" />
            <Text style={styles.sectionTitle}>Chemical Treatment</Text>
          </View>

          {result.chemical.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* HOME REMEDIES */}
        <View style={[styles.section, styles.orangeBg]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="home-outline" size={20} color="#EA580C" />
            <Text style={styles.sectionTitle}>Home Remedies</Text>
          </View>

          {result.home.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Ionicons name="ellipse" size={8} color="#EA580C" />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* IMPORTANT TIPS */}
        <View style={[styles.section, styles.blueBg]}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#2563EB"
            />
            <Text style={styles.sectionTitle}>Important Tips</Text>
          </View>

          {result.tips.map((tip, i) => (
            <Text key={i} style={styles.tipText}>
              • {tip}
            </Text>
          ))}
        </View>

        {/* AI ASSISTANT BUTTON */}
        <Pressable
          style={styles.aiButton}
          onPress={() =>
            router.push({
              pathname: '/assistant',
              params: { disease: result.disease },
            })
          }
        >
          <View style={styles.aiIconWrap}>
            <Ionicons name="sparkles" size={18} color="#fff" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>Ask AI Assistant</Text>
            <Text style={styles.aiSubtitle}>
              Get instant answers about treatment
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </Pressable>

        {/* BACK BUTTON */}
        <Pressable
          style={styles.outlineBtn}
          onPress={() => router.push('/result')}
        >
          <Text style={styles.outlineText}>Back to Results</Text>
        </Pressable>

        {/* ACTION BUTTONS */}
        <View style={styles.row}>
          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push('/select')}
          >
            <Text style={styles.secondaryText}>Analyze Another</Text>
          </Pressable>

          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.primaryText}>Done</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  detectedBox: {
    marginTop: 24,
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  detectedLabel: {
    fontSize: 12,
    color: '#9A3412',
  },
  detectedText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EA580C',
  },

  section: {
    marginTop: 20,
    borderRadius: 18,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 15,
  },

  greenBg: {
    backgroundColor: '#ECFDF5',
  },
  orangeBg: {
    backgroundColor: '#FFF7ED',
  },
  blueBg: {
    backgroundColor: '#EFF6FF',
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 13,
    color: '#374151',
  },

  tipText: {
    fontSize: 13,
    color: '#1F2937',
    marginBottom: 6,
  },

  aiButton: {
    marginTop: 24,
    backgroundColor: '#9333EA',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#9333EA',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  aiIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  aiSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },

  outlineBtn: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    padding: 14,
    borderRadius: 14,
  },
  outlineText: {
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.light.tint,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 14,
    borderRadius: 14,
  },
  secondaryText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#374151',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: Colors.light.tint,
    padding: 14,
    borderRadius: 14,
  },
  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
