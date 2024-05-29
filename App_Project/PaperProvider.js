import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import App from './src/App';
import MyTheme from './assets/fonts/Themes/MyTheme';

export default function Main() {
  return (
    <PaperProvider theme={MyTheme}>
      <App />
    </PaperProvider>
  );
}