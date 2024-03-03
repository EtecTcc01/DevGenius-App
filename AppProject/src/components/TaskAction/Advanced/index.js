import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./style";
import * as React from "react";
import api from "../../../../api";

export function AdvancedTask(props) {
    const dataT = props.data;

    const [answer, setAnswer] = React.useState([]);
    const [alt, setAlt] = React.useState([]);
    const [codeTxt, setCodeTxt] = React.useState([]);
    const [subCode, setSubCode] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [count, setCount] = React.useState(1);

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
        let controlTxt = [];

        for (let i = 0; i < splitTxt.length; i++) {
            let splitTemp = splitTxt[i].split(" ")
            let splitChar = splitTxt[i].split("")
            let subTxt = []; let subTemp = [];
            let controlT = [];

            splitTemp.forEach(e => {
                if (e.length > 0) {
                    splitFinal.push(e);
                } else {
                    []
                }
            });

            splitChar.forEach(e => {
                if (e !== " ") {
                    subTxt.push(e.replace(e, "_"));
                } else {
                    subTxt.push(e);
                }
            });

            subTxt.forEach(e => {
                if (subTemp.length < 1) {
                    subTemp.push(e)
                } else {
                    subTemp = [subTemp[0] + e];
                }
            });

            subTemp[0].split(" ").forEach(e => {
                if (controlT.length < 1) {
                    controlT = e + "‼‼‼";
                } else {
                    controlT += ` ${e}‼‼‼`
                }
            })

            controlTxt.push(controlT.slice(0, subTemp.length - 3) + "\n")
            subFinal.push(subTemp + "\n")
        }

        setAlt(splitFinal)
        setSubCode(controlTxt)
        setCodeTxt(subFinal)
        setVisible(true)

    };

    function altCompare({ temp }) {
        let answerT = answer.answer_text.split("\n")
        let tempAns = []; let ccount = 0;

        if (count >= alt.length) {
            temp.forEach(element => {
                tempAns.push(element.slice(0, (element.length) - 1));
            });

            for (let i = 0; i < tempAns.length; i++) {
                if (answerT[i] == tempAns[i]) {
                    console.log("true")
                    ccount++;
                } else {
                    console.log("false")
                }
            }

            if (ccount == answerT.length) {
                alert("Corretissimo")
            } else {
                alert("Erradissimo")
            }
        } else {
            []
        }
    }

    async function replaceTxt(e) {
        let subCount = 0;
        let subCodeText = subCode;
        let codeTxtTemp = codeTxt;

        for (let i = 0; i < subCodeText.length; i++) {
            let splitSpaceT = subCodeText[i].split(" ")
            let textTemp = ""; let subTextTemp = "";

            splitSpaceT.forEach(element => {
                if (element.includes("‼") == true && subCount == 0) {
                    if ((textTemp.length < 1)) {
                        textTemp = `${e}`
                        subTextTemp = `${e}`
                    } else {
                        textTemp += ` ${e}`
                        subTextTemp += ` ${e}`
                    }
                    subCount = 1;
                } else {
                    if ((textTemp.length < 1)) {
                        textTemp = `${element.includes("‼") == true ? element.slice(0, element.length - 3) : element}`
                        subTextTemp = `${element}`
                    } else {
                        textTemp += ` ${element.includes("‼") == true ? element.slice(0, element.length - 3) : element}`
                        subTextTemp += ` ${element}`
                    }
                }
                setCount((count + 1))
            });
            codeTxtTemp[i] = `${textTemp.slice(0, textTemp.length)}\n`
            subCodeText[i] = `${subTextTemp}`
        }
        setCodeTxt([codeTxtTemp])
        altCompare({ temp: codeTxtTemp })
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
