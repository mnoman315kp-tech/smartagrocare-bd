/**
 * Global theme configuration for Plant Disease Detection App
 * White + Green professional color palette
 */

import { Platform } from 'react-native';

/* 🌿 Primary Green Shades */
const plantGreen = '#2E7D32';        // Primary green
const plantGreenLight = '#A5D6A7';   // Light green
const plantGreenDark = '#1B5E20';    // Dark green

export const Colors = {
  light: {
    text: '#1B1B1B',
    background: '#FFFFFF',
    card: '#F7F9F7',
    border: '#E0E0E0',

    /* Brand Colors */
    primary: plantGreen,
    secondary: plantGreenLight,

    /* Expo defaults (mapped to green) */
    tint: plantGreen,
    icon: '#5F6F61',
    tabIconDefault: '#5F6F61',
    tabIconSelected: plantGreen,
  },

  dark: {
    text: '#ECEDEE',
    background: '#121212',
    card: '#1E1E1E',
    border: '#2C2C2C',

    primary: plantGreenLight,
    secondary: plantGreen,

    tint: '#FFFFFF',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FFFFFF',
  },
};

/* 🔤 Font configuration (UNCHANGED – already professional) */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
