// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes/index'
// importando o componente dentro de {} pois há um export sem default e com nome Routes

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <Routes />
    </NavigationContainer>
  );
}
