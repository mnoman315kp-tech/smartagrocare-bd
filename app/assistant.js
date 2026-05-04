import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function AssistantScreen() {
  const router = useRouter();
  const { disease } = useLocalSearchParams();

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    {
      type: 'bot',
      text: `I can help you understand the ${
        disease || 'plant disease'
      } treatment better. Ask anything!`,
    },
  ]);

  // ✅ SEND MESSAGE TO BACKEND
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { type: 'user', text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(
        'https://smartagrocare-backend-production.up.railway.app/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message,
            disease: disease,
          }),
        }
      );

      const data = await res.json();

      const botMsg = {
        type: 'bot',
        text: data.reply || 'No response from AI',
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (error) {
      console.log('API Error:', error);

      setChat((prev) => [
        ...prev,
        { type: 'bot', text: 'Server error. Try again later.' },
      ]);
    }

    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>

        <View style={styles.headerCenter}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <Text style={styles.headerSubtitle}>
              Ask about {disease || 'Plant Disease'}
            </Text>
          </View>
        </View>

        <View style={{ width: 24 }} />
      </View>

      {/* CHAT */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chat.map((item, index) => (
          <View
            key={index}
            style={
              item.type === 'user'
                ? styles.userMessage
                : styles.botMessage
            }
          >
            <Text
              style={
                item.type === 'user'
                  ? styles.userText
                  : styles.botText
              }
            >
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* INPUT */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Type your question..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={message}
          onChangeText={setMessage}
        />

        {/* SEND BUTTON */}
        <Pressable style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={18} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F8FAFC' },

  header: {
    paddingTop: 55,
    paddingHorizontal: 16,
    paddingBottom: 18,
    backgroundColor: '#9333EA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginLeft: 12,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
  },

  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },

  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
  },

  chatContainer: { padding: 16, paddingBottom: 100 },

  botMessage: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderTopLeftRadius: 4,
    maxWidth: '85%',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },

  userMessage: {
    backgroundColor: '#9333EA',
    padding: 14,
    borderRadius: 14,
    borderTopRightRadius: 4,
    maxWidth: '85%',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },

  botText: { color: '#1E293B' },
  userText: { color: '#fff' },

  inputBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
  },

  input: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  sendBtn: {
    marginLeft: 8,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#9333EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});