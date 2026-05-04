import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react'; // ✅ add this
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/theme';
import { createTable } from './databaseFunctions'; // ✅ import DB function

export default function Layout() {
  const router = useRouter();

  // ✅ RUN SQLITE TABLE CREATION ON APP START
  useEffect(() => {
    createTable();
  }, []);

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: Colors.light.tint },
        headerTintColor: '#fff',
        drawerActiveTintColor: Colors.light.tint,
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.drawerContainer}
        >
          {/* 🔰 FULL-WIDTH DRAWER HEADER */}
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Menu</Text>
          </View>

          {/* DRAWER ITEMS */}
          <View style={styles.drawerItems}>
            <DrawerItemList {...props} />
          </View>

          {/* 🚪 LOGOUT BUTTON */}
          <View style={styles.logoutContainer}>
            <Pressable
              style={styles.logoutBtn}
              onPress={() => router.replace('/')}
            >
              <Ionicons name="log-out-outline" size={20} color="#DC2626" />
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
          </View>
        </DrawerContentScrollView>
      )}
    >
      {/* VISIBLE SCREENS */}
      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="history"
        options={{
          title: 'History',
          drawerIcon: ({ color }) => (
            <Ionicons name="time" size={20} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          title: 'About',
          drawerIcon: ({ color }) => (
            <Ionicons name="information-circle" size={20} color={color} />
          ),
        }}
      />

      {/* HIDDEN SCREENS */}
      <Drawer.Screen name="login" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="signup" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="select" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="capture" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="quality" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="processing" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="result" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="recommendation" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="modal" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="(tabs)" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="logout" options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 0,
  },

  drawerHeader: {
    width: '100%',
    backgroundColor: Colors.light.tint,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  drawerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  drawerItems: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },

  logoutContainer: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  logoutText: {
    marginLeft: 10,
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 15,
  },
});
