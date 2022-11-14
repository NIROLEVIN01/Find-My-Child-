import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeScreen from './src/screens/WelcomePage';
import SignUp from './src/screens/SignUp'
import SignIn from './src/screens/SignIn'

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer styles={styles.container}>
        <Drawer.Navigator useLegacyImplementation>
          <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ gestureEnabled: false }} />
          <Drawer.Screen name="SignUp" component={SignUp} />
          <Drawer.Screen name="SignIn" component={SignIn} />
      </Drawer.Navigator>
  </NavigationContainer>
  )
}

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer styles={styles.container}>
//         <Stack.Navigator>
//           <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
//           <Stack.Screen name="SignUp" component={SignUp} />
//           <Stack.Screen name="SignIn" component={SignIn} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
