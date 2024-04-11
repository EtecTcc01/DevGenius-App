import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes/index'
import { Provider as PaperProvider } from 'react-native-paper';
import MyTheme from './src/assetsFonts/Themes/MyTheme';

export default function App() {
  return (
    <PaperProvider theme={MyTheme}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Routes />
      </NavigationContainer>
    </PaperProvider>
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
