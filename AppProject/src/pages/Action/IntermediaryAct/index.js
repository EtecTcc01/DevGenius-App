import { StyleSheet, View } from "react-native";
import { IntermediaryTask } from "../../../components/TaskAction/Intermediary";

export function IntermediaryAct({ route }) {
  const dataT = route.params.act;

  return (
    <View style={styles.container}>
      <IntermediaryTask data={dataT} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
