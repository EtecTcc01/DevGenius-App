import { DefaultTheme } from 'react-native-paper';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#06c244',
    accent: '#white',
  },
};

export default MyTheme;
