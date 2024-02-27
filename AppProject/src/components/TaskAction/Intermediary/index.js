import { Text, View, TouchableOpacity } from "react-native";
import * as React from "react";
import api from "../../../../api";
import { styles } from "./style";

export function IntermediaryTask(props) {
    const dataT = props.data;

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

    async function replaceTxt(e) {
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
            setTimeout(() => { altCompare(temp) }, 250);
        }
    }

    if (visible == true) {
        const listAlts = alt.map((e) => {
            return (
                <TouchableOpacity style={styles.button} onPress={() => replaceTxt(e)}>
                    <Text style={styles.title}>{e}</Text>
                </TouchableOpacity>
            );
        });

        return (
            <View style={styles.container}>
                <View style={styles.contentA}>
                    <><Text style={styles.titleB}>{taskT}</Text></>
                </View>
                <View style={styles.content}>{listAlts}</View>
            </View>
        );
    } else {
        [];
    }
}