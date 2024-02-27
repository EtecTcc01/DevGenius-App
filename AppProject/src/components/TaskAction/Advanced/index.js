import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./style";
import * as React from "react";
import api from "../../../../api";

export function AdvancedTask(props) {
    const dataT = props.data;

    const [answer, setAnswer] = React.useState([]);
    const [alt, setAlt] = React.useState([]);
    const [codeTxt, setCodeTxt] = React.useState([]);
    // const [subCode, setSubCode] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    // const [count, setCount] = React.useState(0);

    const getAnswer = async () => {
        try {
            const res = await api.get(`/advancedAnswer/unTask/${dataT.id}`);
            setAnswer(res.data.answer[0]);
            splitAnswer({ answerTxt: res.data.answer[0].answer_text })
        } catch (error) {
            alert(`Erro ao pegar os dados da resposta. ${error}`);
        }
    };

    React.useEffect(() => {
        getAnswer();
    }, []);

    const splitAnswer = async ({ answerTxt }) => {
        const splitTxt = answerTxt.split("\n");
        let splitFinal = []; let subFinal = [];

        for (let i = 0; i < splitTxt.length; i++) {
            let splitTemp = splitTxt[i].split(" ")
            let splitChar = splitTxt[i].split("")
            let answerSub = []; let subTemp = [];

            splitTemp.forEach(e => {
                if (e.length > 0) {
                    splitFinal.push(e);
                } else {
                    []
                }
            });

            splitChar.forEach(e => {
                if (e !== " ") {
                    answerSub.push(e.replace(e, "_"));
                } else {
                    answerSub.push(e);
                }
            });

            answerSub.forEach(e => {
                if (subTemp < 1) {
                    subTemp.push(e)
                } else {
                    subTemp = [subTemp[0] + e];
                }
            });

            subFinal.push(subTemp + "\n")
        }

        setAlt(splitFinal)
        setCodeTxt(subFinal)
        setVisible(true)

    };

    // function altCompare(temp) {
    //   const answerT = temp;

    //   if (answerT == answer.answer_text) {
    //     alert("Acertou!!!");
    //   } else {
    //     alert("Errouuuuuu!");
    //     setTaskT(dataT.task_text);
    //   }
    // }

    async function replaceTxt(e) {
        let subCode = codeTxt; let splitT = 0;
        let subCount = false;

        subCode.forEach(element => {
            splitT = element.split(" ")
            if (subCount == false) {
                console.log(splitT)
                subCount = true
            }
        });
    }

    if (visible == true) {

        const listAlts = alt.map((e) => {
            return (
                <TouchableOpacity style={styles.button} onPress={() => replaceTxt(e)}>
                    <Text style={styles.title}>{e}</Text>
                </TouchableOpacity>
            )
        });

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{dataT.task_text}</Text>
                </View>
                <View style={styles.contentA}>
                    <><Text style={styles.titleB}>{codeTxt}</Text></>
                </View>
                <ScrollView style={styles.contentB}>
                    <Text style={styles.title}>{listAlts}</Text>
                </ScrollView>
            </View>
        );
    } else {
        [];
    }
}
