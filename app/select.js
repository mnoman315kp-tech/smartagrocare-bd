import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import { Colors } from '../constants/theme';

export default function SelectPlant() {
  const router = useRouter();

  const selectPlant = (plant) => {
    router.push('/capture');
  };

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* 🔥 MAIN APP TITLE */}
        <Text style={styles.appTitle}>Smart AgroCare</Text>

        {/* 🔥 SUB HEADER WITH BACK BUTTON */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </Pressable>

          <Text style={styles.headerTitle}>Select Plant Type</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons
            name="leaf-outline"
            size={22}
            color={Colors.light.tint}
          />
          <Text style={styles.infoText}>
            Choose the plant type you want to analyze for disease detection.
            This helps our AI provide more accurate results.
          </Text>
        </View>

        {/* Tomato */}
        <Pressable
          style={styles.card}
          onPress={() => selectPlant('tomato')}
        >
          <Text style={styles.emoji}>🍅</Text>
          <View>
            <Text style={styles.cardTitle}>Tomato</Text>
            <Text style={styles.cardSub}>
              Detect diseases in tomato plants
            </Text>
          </View>
        </Pressable>

        {/* Cucumber */}
        <Pressable
          style={styles.card}
          onPress={() => selectPlant('cucumber')}
        >
          <Text style={styles.emoji}>🥒</Text>
          <View>
            <Text style={styles.cardTitle}>Cucumber</Text>
            <Text style={styles.cardSub}>
              Detect diseases in cucumber plants
            </Text>
          </View>
        </Pressable>

        {/* Capsicum */}
        <Pressable
          style={styles.card}
          onPress={() => selectPlant('capsicum')}
        >
          <Text style={styles.emoji}>🫑</Text>
          <View>
            <Text style={styles.cardTitle}>Capsicum</Text>
            <Text style={styles.cardSub}>
              Detect diseases in capsicum plants
            </Text>
          </View>
        </Pressable>

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
    backgroundColor: 'transparent',
  },

  // 🔥 BIG MAIN TITLE
  appTitle: {
    textAlign: 'center',
    fontSize: 28,          // bigger
    fontWeight: '800',     // extra bold
    color: Colors.light.tint,
    marginTop: 40,
    marginBottom: 20,
    letterSpacing: 1,
  },

  // 🔥 SUB HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  infoCard: {
    marginTop: 24,
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },

  infoText: {
    flex: 1,
    color: '#065F46',
    fontSize: 14,
    lineHeight: 20,
  },

  card: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  emoji: {
    fontSize: 44,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  cardSub: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
});
