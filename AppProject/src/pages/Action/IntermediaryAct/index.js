import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as React from "react";
import api from "../../../../api";

export function IntermediaryAct({ route }) {
  const dataT = route.params.act;

  const [answerU, setAnswerU] = React.useState();
  const [count, setCount] = React.useState(0);
  const [taskT, setTaskT] = React.useState(dataT.task_text);
  const [answer, setAnswer] = React.useState([]);
  const [alt, setAlt] = React.useState();
  const [visible, setVisible] = React.useState(false);

  const getAnswer = async () => {
    try {
      const res = await api.get(`/intermediaryAnswer/unTask/${dataT.id}`);
      setAnswer(res.data.answer[0]);
    } catch (error) {
      alert(`Erro ao pegar os dados da resposta. ${error}`);
    }
  };

  React.useEffect(() => {
    getAnswer();
  }, []);

  const random = () => {
    const alts = [
      answer.answer_text,
      answer.alternativeA,
      answer.alternativeB,
      answer.alternativeC,
      answer.alternativeD,
      answer.alternativeE,
    ];
    const splitT = [];

    for (let i = alts.length - 1; i > -1; i--) {
      let temp = alts[i];
      try {
        let tempI = temp.split(" ");

        if (tempI.length > 1) {
          for (let i = tempI.length - 1; i > -1; i--) {
            splitT.push(tempI[i]);
          }
        } else {
          splitT.push(temp);
        }
      } catch {
        [];
      }
    }

    for (let i = splitT.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));

      [splitT[i], splitT[random]] = [splitT[random], splitT[i]];
    }

    setAlt(splitT);
    setVisible(true);
  };

  React.useEffect(() => {
    random();
  }, [answer]);

  function altCompare(temp) {
    const answerT = temp;
    setCount(0);

    if (answerT == answer.answer_text) {
      alert("Acertou!!!");
    } else {
      alert("Errouuuuuu!");
      setTaskT(dataT.task_text);
    }
  }

  async function teste(e) {
    const answerC = answer.answer_text.split(" ");
    const alternate = taskT.replace("‼", e);
    let temp = "";

    if (count == 0) {
      setAnswerU(`${e}`);
    } else {
      temp = answerU + ` ${e}`;
      setAnswerU(answerU + ` ${e}`);
    }

    setTaskT(`${alternate}`);
    setCount(count + 1);

    if (count >= answerC.length - 1) {
      altCompare(temp);
    }
  }

  if (visible == true) {
    const listAlts = alt.map((e) => {
      return (
        <TouchableOpacity style={styles.button} onPress={() => teste(e)}>
          <Text style={styles.title}>{e}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.contentA}>
          <View>
            <Text style={styles.titleB}>{taskT}</Text>
          </View>
          {/* <TouchableOpacity style={styles.btn} onPress={() => altCompare()}>
            <Text style={styles.title}>Teste</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.content}>{listAlts}</View>
      </View>
    );
  } else {
    [];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  content: {
    height: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    borderColor: "#06c244",
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderWidth: 5,
    marginTop: "8px",
  },
  contentA: {
    flex: 1,
    borderColor: "#06c244",
    borderWidth: 5,
    borderRadius: 10,
    elevation: 10,
    padding: "3%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#06c244",
    textAlign: "center",
  },
  button: {
    borderRadius: 100,
    maxWidth: "auto",
    minWidth: 90,
    height: 45,
    borderColor: "#06c244",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    margin: "2%",
    padding: "3%",
  },
  btn: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    borderRadius: 30,
    maxWidth: "auto",
    minWidth: 90,
    height: 45,
    borderColor: "#06c244",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    margin: "2%",
    padding: "3%",
  },
  titleB: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#06c244",
    textAlign: "left",
  },
});
