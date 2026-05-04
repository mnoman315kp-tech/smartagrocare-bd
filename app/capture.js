import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../components/ScreenBackground';
import { Colors } from '../constants/theme';

export default function Capture() {
  const router = useRouter();

  // 📂 Pick image from gallery
  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow gallery access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      router.push('/quality');
    }
  };

  // 📸 Capture image from camera
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow camera access');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      router.push('/quality');
    }
  };

  // ✅ ONLY ONE RETURN
  return (
    <ScreenBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.replace('/select')}>
            <Ionicons name="arrow-back" size={24} color="#0F172A" />
          </Pressable>
          <Text style={styles.headerTitle}>Upload Image</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Detect Plant Disease</Text>
        <Text style={styles.subtitle}>
          Upload an image of your plant to identify diseases
        </Text>

        {/* Upload Box */}
        <Pressable style={styles.uploadBox} onPress={openCamera}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="cloud-upload-outline"
              size={34}
              color={Colors.light.tint}
            />
          </View>

          <Text style={styles.uploadText}>
            Click to upload or capture image
          </Text>
          <Text style={styles.fileText}>PNG, JPG up to 10MB</Text>

          <View style={styles.buttonRow}>
            <Pressable style={styles.primaryBtn} onPress={pickFromGallery}>
              <Text style={styles.primaryText}>Browse Files</Text>
            </Pressable>

            <Pressable style={styles.outlineBtn} onPress={openCamera}>
              <Ionicons
                name="camera-outline"
                size={18}
                color={Colors.light.tint}
              />
              <Text style={styles.outlineText}> Camera</Text>
            </Pressable>
          </View>
        </Pressable>
      </View>
    </ScreenBackground>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // ⭐ REQUIRED
    padding: 24,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 10,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconCircle: {
    backgroundColor: '#DCFCE7',
    padding: 20,
    borderRadius: 50,
    marginBottom: 14,
  },
  uploadText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 4,
  },
  fileText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlineText: {
    color: Colors.light.tint,
    fontWeight: '600',
    fontSize: 14,
  },
});
