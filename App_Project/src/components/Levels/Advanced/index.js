import * as React from "react";
import { styles } from "./style";
import { ScrollView, Text, View } from "react-native";

import { random } from "../randomizer";
import { getAnswerByTask } from "../../../functions/task.services";

import { ListAlts } from "../../Lists/ListAlts";
import { TopBarUtils } from "../TopBarUtils";

export function AdvancedAct({ task, press, _lifes }) {

    const [expanded, setExpanded] = React.useState(false)

    const [answer, setAnswer] = React.useState([]); //STATE DA REQUISIÇÃO
    const [alt, setAlt] = React.useState([]); //STATE DAS ALTERNATIVAS
    const [altBkp, setAltBkp] = React.useState([]); //STATE DO BKP DAS ALTERNATIVAS
    const [codeTxt, setCodeTxt] = React.useState([]);//STATE DO COD. A SER EXIBIO
    const [subCode, setSubCode] = React.useState([]); //STATE DO COD. A SER TRABALHADO

    const [first, setFirst] = React.useState(true); //STATE DA VERIFICAÇÃO DA 1° TENTATIVA
    const [count, setCount] = React.useState(0); //STATE DO CONTADOR P/TENTATIVAS REALIZADAS (?)

    const [selectedId, setSelectedId] = React.useState([]);//STATE'S DOS ID'S SELECIONADAS
    const [idCorrect, setIdCorrect] = React.useState([]); //STATE P/ARMAZENAR ID'S (ALT'S) CORRETOS
    const [idTip, setIdTip] = React.useState([]); //STATE P/ARMAZENAR ID'S (ALT'S) DA DICA

    //STATE'S DOS ID'S E ALT'S RESTANTES
    const [remainingId, setRemainingId] = React.useState([]);
    const [remainingAlt, setRemainingAlt] = React.useState([]);

    //FUNÇÃO P/NÃO BUGAR INFORMAÇÃO NA TROCA DE TELAS
    React.useEffect(() => {
        if (task != undefined || task != null) {
            setRemainingAlt([])
            setRemainingId([])
            setIdTip([])
            setIdCorrect([])
            setSelectedId([])
            setCount(0)
            setFirst(true)
        }
    }, [task])

    //FUNÇÃO P/BUSCAR DADOS DA RESPOSTA DA TASK
    React.useEffect(() => {
        if (task != undefined || task != null) {
            getAnswerByTask("advancedAnswer", task.id_task)
                .then((data) => {
                    if (!data) {
                        console.log("Erro ao buscar dados referentes à resposta da task.")
                        setFail(true)
                        return
                    }

                    setAnswer(data)
                    console.log(data)
                    splitAnswer({ answerTxt: data._code })
                })
        }
    }, [task])

    //FUNÇÃO P/FORMATAÇÃO DO CÓDIGO DA TASK E SEPARAÇÃO DAS ALTERNATIVAS (NÃO MEXER!!!)
    const splitAnswer = async ({ answerTxt }) => {
        const splitTxt = answerTxt.split("\n");
        console.log(splitTxt)

        let splitFinal = []; let subFinal = [];
        let controlTxt = [];

        //ENTRANDO EM CD UMA DAS LINHAS PARA MODIFICA-LAS
        for (let i = 0; i < splitTxt.length; i++) {
            let splitTemp = splitTxt[i].split(" ") //SEPARANDO PARA CRIAR ALTERNATIVASS
            let splitChar = splitTxt[i].split("") //SEPARANDO P/FORMATAÇÃO DOS CARACTERES

            let subTxt = []; let subTemp = [];
            let controlT = [];

            //SEPARANDO/ADICIONANDO ALTS EM UM ELEMENTO P/RANDOMIZA-LOS POSTERIORMENTE
            splitTemp.forEach(e => {
                if (e.length > 0) {
                    splitFinal.push(e);
                }
            });

            //MODIFICANDO CD CARACTERE COM EXCESÃO DO " "
            splitChar.forEach(e => {
                if (e !== " ") {
                    subTxt.push(e.replace(e, "_"));
                } else {
                    subTxt.push(e);
                }
            });

            //ADICIONANDO ELEMENTOS SEM ESPECILHOS PARA VISUALIZAÇÃO DO TEXTO
            subTxt.forEach(e => {
                if (subTemp.length < 1) {
                    subTemp.push(e)
                } else {
                    subTemp = [subTemp[0] + e];
                }
            });

            //ADICIONANDO CHAR P/USAR DE CONDIÇÃO PARA FORMATAÇÃO DE TEXTO
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

        setSubCode(controlTxt)

        setCodeTxt(() => {
            const final = []
            for (let i = 0; i < subFinal.length; i++) {
                final.push(`${i}.   ${subFinal[i]}`)
            }
            return final
        })

        randomizer(splitFinal)
    };

    //FUNÇÃO DE RANDOMIZAÇÃO DAS ALTERNATIVAS
    const randomizer = async (alts) => {
        let splitT = [];

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
                console.log("Erro ao randomizar os elementos.")
            }
        }

        const res = await random(splitT)
        console.log(res)

        setAlt(splitT)
        setAltBkp(splitT);
    };

    //FUNÇÃO P/VALIDAÇÃO DA RESPOSTA (POR "RODADA")
    function altCompare(altList, answerT, idsCorrect) {
        let answerText = []; let ccount = 0;
        let correctlyIds = idCorrect
        let state = 3

        //ADICIONANDO MAIS ALTERNATIVAS CORRETAS NO STATE
        idsCorrect.forEach(element => {
            correctlyIds.push(element)
        });

        answerT.forEach((element) => {
            let temp = element.split(" ")
            for (let i = 0; i < temp.length; i++) {
                answerText.push(temp[i])
            }
        })

        let altChoice = []; let altVerify = []

        altList.forEach((element, index) => {
            altChoice.push(element.slice(5, element.length - 1))

            const altsV = altChoice[index].split(" ")
            for (let i = 0; i < altsV.length; i++) {
                altVerify.push(altsV[i])
            }
        })

        for (let i = 0; i < answerText.length; i++) {
            if (answerText[i] == altVerify[i]) {
                ccount++
            }
        }

        if (ccount >= answerText.length) {
            state = 1
        } else {
            state = 0
            setCount(0)
            setRemainingId([])
            setRemainingAlt([])
            setSelectedId(correctlyIds)
        }

        if (state === 1) {
            setTimeout(() => {
                press(1, false) //ENVIA UMA RESPOSTA POSITIVA PARA A PAGINA CENTRAL
            }, 500);
        } else if (state === 0) {
            setTimeout(() => {
                press(3, first)
            }, 250);
        }

        if (first === true) {
            setFirst(false)
        }
    }

    //FUNÇÃO P/EXECUÇÃO DAS ALTERNATIVAS SEGUINTES
    function replaceTxt(e, altIndex) {

        let idsRemaining = remainingId
        idsRemaining.push(altIndex)
        setRemainingId(idsRemaining)

        let altList = remainingAlt
        altList.push(e)
        setRemainingAlt(altList)

        if ((idsRemaining.length + selectedId.length) >= altBkp.length) {
            const answerT = answer._code.split("\n")

            let subCount = 0; let subTemp = subCode;
            let codeTemp = []; let idsCorrectly = []

            codeTxt.forEach((element, index) => {
                codeTemp.push(element.slice(5, element.length - 1))
            })

            answerT.forEach((element, index) => {
                const answerS = element.split(" ")
                const subCodeTemp = subTemp[index].split(" ")
                let textTemp = ""; let subC = ""

                for (let i = 0; i < answerS.length; i++) {
                    if (subCodeTemp[i].includes("‼")) {
                        if (altList[subCount] == answerS[i]) {
                            if (textTemp.length < 1) {
                                textTemp = `${altList[subCount]}`
                                subC = `${altList[subCount]}`

                                idsCorrectly.push(idsRemaining[subCount])
                                subCount++;
                            } else {
                                textTemp += ` ${altList[subCount]}`
                                subC += ` ${altList[subCount]}`

                                idsCorrectly.push(idsRemaining[subCount])
                                subCount++;
                            }
                        } else {
                            if (textTemp.length < 1) {
                                textTemp = `${subCodeTemp[i].includes("‼") == true ? subCodeTemp[i].slice(0, subCodeTemp[i].length - 3) : subCodeTemp[i]}`
                                subC = `${subCodeTemp[i]}`
                                subCount++
                            } else {
                                textTemp += ` ${subCodeTemp[i].includes("‼") == true ? subCodeTemp[i].slice(0, subCodeTemp[i].length - 3) : subCodeTemp[i]}`
                                subC += ` ${subCodeTemp[i]}`
                                subCount++
                            }
                        }
                    } else {
                        if (textTemp.length < 1) {
                            textTemp = `${subCodeTemp[i].includes("‼") == true ? subCodeTemp[i].slice(0, subCodeTemp[i].length - 3) : subCodeTemp[i]}`
                            subC = `${subCodeTemp[i]}`
                        } else {
                            textTemp += ` ${subCodeTemp[i].includes("‼") == true ? subCodeTemp[i].slice(0, subCodeTemp[i].length - 3) : subCodeTemp[i]}`
                            subC += ` ${subCodeTemp[i]}`
                        }
                    }
                }
                codeTemp[index] = `${index}.   ${textTemp.slice(0, textTemp.length)}\n`
                subTemp[index] = `${subC}`

            })

            setCodeTxt([codeTemp]); setSubCode(subTemp)
            altCompare(codeTemp, answerT, idsCorrectly)
        }
        setCount((count + 1))
    }

    //FUNÇÃO P/RESET DOS DADOS (NÃO DISPONIBILIZADO P/1° TENTAIVA POR BUG E "NIVELAMENTO")
    function reloadT() {
        setCount(0)
        setRemainingId([])
        setRemainingAlt([])
        setSelectedId(idCorrect)
    }

    //FUNÇÃO P/DISPONIBILIZAR A DICA
    function nRandom() {

    }

    function changeExpand() {
        setExpanded(!expanded)
    }

    return (
        <>
            {
                altBkp.length > 0 && (
                    <View style={styles.container}>

                        <View style={styles.task_content}>

                            <View style={styles.content_utils}>
                                <TopBarUtils onlyLifes={false} idTip={idTip} pressTip={nRandom} pressReload={reloadT} first={first} lifes={_lifes} />
                            </View>

                            <ScrollView horizontal={true} style={styles.contentHScroll} contentContainerStyle={styles.content_text}>
                                <Text style={styles.titleA}>{codeTxt}</Text>
                            </ScrollView>

                        </View>

                        <View style={styles.content_alts}>
                            <ListAlts expanded={expanded} expandPress={() => changeExpand()} alt={alt.length > 0 ? alt : []} selects={selectedId.length > 0 ? selectedId : []} remaining={remainingId.length > 0 ? remainingId : []} tips={idTip.length > 0 ? idTip : []} pressing={(alt, altIndex) => replaceTxt(alt, altIndex)} />
                        </View>

                    </View>
                )
            }
        </>
    )
}