import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes/index'
// importando o componente dentro de {} pois há um export sem default e com nome Routes
import UserProvider from './src/apis/contexts/user';

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <Routes />
      </UserProvider>
    </NavigationContainer>
  );
}
