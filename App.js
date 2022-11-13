import { StyleSheet, Text, View } from 'react-native';
// import WelcomeScreen from './src/screens/WelcomePage';
import WelcomeScreen from './src/screens/WelcomePage';

export default function App() {
  return (
    <View style={styles.container}>
      <WelcomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});