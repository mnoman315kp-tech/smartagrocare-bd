import { ImageBackground, StyleSheet } from 'react-native';

export default function ScreenBackground({ children }) {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <ImageBackground
        style={styles.overlay}
      >
        {children}
      </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});
