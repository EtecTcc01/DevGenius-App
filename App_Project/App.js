import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <StackRoutes />
    </NavigationContainer>
  );
}

