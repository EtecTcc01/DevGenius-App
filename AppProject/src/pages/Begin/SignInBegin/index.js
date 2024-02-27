import { StyleSheet, View } from 'react-native';
import { SignInForm } from '../../../components/Forms/SignIn';

export function SignInBg() {
  return (
    <View style={styles.container}>
      <SignInForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});