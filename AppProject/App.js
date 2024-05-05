import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from './src/routes';
import { Provider as PaperProvider } from 'react-native-paper';
import MyTheme from './assets/fonts/Themes/MyTheme';

export default function App() {
  return (
    <PaperProvider theme={MyTheme}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <StackRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}

