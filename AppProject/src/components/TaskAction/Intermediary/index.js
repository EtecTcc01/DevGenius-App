import * as React from "react";
import api from "../../../../api";
import { styles } from "./style";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

export function IntermediaryTask(props) {
    const dataT = props.data;

    const [count, setCount] = React.useState(0);
    const [taskT, setTaskT] = React.useState(dataT.task_text);
    const [answer, setAnswer] = React.useState([]);
    const [alt, setAlt] = React.useState();
    const [altBkp, setAltBkp] = React.useState();
    const [visible, setVisible] = React.useState(false);
    const [listAlt, setListAlt] = React.useState([]);

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
        setAltBkp(splitT);
        setVisible(true);
    };

    React.useEffect(() => {
        random();
    }, [answer]);

    function reloadT() {
        setCount(0);
        setAlt(altBkp);
        setTaskT(dataT.task_text);
        setListAlt([])
    }

    function altCompare(answerC) {
        setCount(0);; let ccount = 0;
        let temp = taskT

        for (let i = 0; i < answerC.length; i++) {
            if (listAlt[i] == answerC[i]) {
                ccount++;
            } else {
                break
            }
        }

        if (ccount >= answerC.length) {
            listAlt.forEach(e => {
                temp = temp.replace("‼", e)
            });
            setTaskT(temp)
            setTimeout(() => {
                alert("Acertou!!!");
            }, 500);
        } else {
            alert("Errouuuuuu!");
            setTaskT(dataT.task_text);
            setAlt(altBkp);
            setListAlt([]);
        }
    }

    async function replaceTxt(e) {
        const altIndex = alt.findIndex((value, index, array) => { return value == e })
        const remove = alt.toSpliced(altIndex, 1)
        const list = listAlt; setAlt(remove);

        const answerC = answer.answer_text.split(" ");
        list.push(e)

        setCount(count + 1);
        setListAlt(list)

        if (count >= answerC.length - 1) {
            setTimeout(() => {
                altCompare(answerC)
            }, 250);
        }
    }

    if (visible == true) {

        const listAlts = () => alt.map((e) => {
            return (
                <TouchableOpacity style={styles.button} onPress={() => replaceTxt(e)}>
                    <Text style={styles.title}>{e}</Text>
                </TouchableOpacity>
            );
        });

        const altRemoved = () => listAlt.map((e) => {
            try {
                return (
                    <TouchableOpacity style={styles.button} onPress={() => replaceTxt(e)}>
                        <Text style={styles.title}>{e}</Text>
                    </TouchableOpacity>
                );
            } catch { [] }
        })

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.contentBtn}>
                        <TouchableOpacity style={styles.btn}>
                            <AntDesign
                                name="questioncircleo"
                                size={24}
                                color="#06c244"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => reloadT()}>
                            <Ionicons
                                size={24}
                                color="#06c244"
                                name="reload"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentText}>
                        <Text style={styles.titleB}>{taskT}</Text>
                    </View>
                </View>
                <View style={styles.contentA}>
                    {altRemoved()}
                </View>
                <View style={styles.contentB}>
                    <ScrollView contentContainerStyle={styles.contentScroll}>{listAlts()}</ScrollView>
                </View>
            </View>
        );
    } else {
        [];
    }
}