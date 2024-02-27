import { StyleSheet, View } from "react-native";
import { AdvancedTask } from "../../../components/TaskAction/Advanced";


export function AdvancedAct({ route }) {
  const dataT = route.params.act;

  return (
    <View style={styles.container}>
      <AdvancedTask data={dataT} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
