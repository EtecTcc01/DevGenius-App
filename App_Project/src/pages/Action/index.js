import * as React from 'react'
import { styles } from './style';
import { View, Text } from 'react-native';

import { Button } from 'react-native-paper'; //IMPORT DE ELEMENTOS DO PAPER

//IMPORT DAS FUNCTIONS USADAS PARA REQUISIÇÃO DE DADOS
import { getStagesByCourse, progressUpdate, lifesUpdate, phaseUpdate, pointsUpdate, levelUpdate, getAllUserAchievements } from '../../functions/helper.services';
import { getTaskByStage, getTeoryByStage } from '../../functions/task.services';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'; //IMPORT P/ANIMAÇÕES

// IMPORT DOS COMPONENTE USADOS
import { BasicAct } from '../../components/Levels/Basic';
import { IntermediaryAct } from '../../components/Levels/Intermediary';
import { AdvancedAct } from '../../components/Levels/Advanced';
import { Details } from '../Details';
import { FinalStatistics } from '../../components/FinalStatistics';
import { getChangedState, getDataUser, storeChangedState, storeUserData } from '../../functions/async.services';
import { Achievement } from '../../components/Achievement';
import { achievementValidation } from '../../components/Achievement/validation';

export function Action({ route }) {
    const navigation = useNavigation()

    const [course, setCourse] = React.useState({})
    const [registration, setRegistration] = React.useState({})
    const [stageContent, setStageContent] = React.useState([]) //STATE P/ARMAZENAR TEORIAS/TASKS DO ESTAGIO
    const [stage, setStage] = React.useState([]) //STATE P/ARMAZENAR ESTAGIOS DO CURSO

    const [first, setFirst] = React.useState(true)
    const [actual, setActual] = React.useState(true)
    const [timer, setTimer] = React.useState(0)

    const [transition, setTransition] = React.useState(false)
    const [lost, setLost] = React.useState(false)
    const [finish, setFinish] = React.useState(false)
    const [achivementV, setAchivementV] = React.useState(false)
    const [type, setType] = React.useState("heart")

    const [lifes, setLifes] = React.useState(0)
    const [points, setPoints] = React.useState(0) //STATE P/ARMAZENAR PONTOS (CORRETOS)
    const [phase, setPhase] = React.useState(0) //STATE P/ARMAZENAR "FASES" DO ESTAGIO ATUAL

    function atualization() {
        getChangedState()
            .then((res) => {
                storeChangedState(res + 1)
            })
    }

    React.useEffect(() => {
        let user = registration.id_user
        let validation = false

        if (user !== undefined && user > 0 && lifes === 0) {
            getAllUserAchievements(registration.id_user)
                .then(async (data) => {
                    if (data.validation === 0) {
                        console.log("Erro ao recolher dados das conquistas do usuário.")
                        return
                    } else if (data.validation === 2) {
                        console.log("Usuário sem conquistas, no momento.")
                        validation = true
                    } else {
                        validation = true
                    }

                    if (validation === true) {
                        let test = {
                            key: "game_over",
                            item: lifes
                        }

                        try {
                            let res = await achievementValidation(test, data.achievement, user)
                            if (res === true) {
                                setAchivementV(true)

                                setTimeout(() => {
                                    setAchivementV(false)
                                }, 5000);
                                
                                atualization()
                            }
                        } catch { [] }
                    }

                })
        }

    }, [lifes])

    React.useEffect(() => {
        const data = route.params
        setRegistration(data.registration[0])
        setCourse(data.course)

        if (data.stage) {
            setStage(data.stage)
            getTeoryData(data.stage._id)

            if (data.registration[0].level_stage !== data.stage.index) {
                setPhase(0)
                setActual(false)
            } else {
                setPhase(data.registration[0]._phase)
                setLifes(data.registration[0]._lifes)
                setPoints(data.registration[0]._points)
            }

        } else {
            setPhase(data.registration[0]._phase)
            getStagesByCourse(data.course.id_course)
                .then((stages) => {
                    if (!stages) {
                        console.log("Erro ao buscar dados relacionados aos estagios.")
                        return
                    }

                    setStage(stages)
                    getTeoryData(stages[data.registration[0].level_stage]._id)
                    setLifes(data.registration[0]._lifes)
                    setPoints(data.registration[0]._points)
                })
        }
    }, [route.params])

    React.useEffect(() => {
        if (registration._lifes && first === false && actual === true) {
            const progress = {
                lifes: lifes,
                registrationId: registration.id_registration
            }

            lifesUpdate(progress)
                .then((data) => {
                    if (!data) {
                        console.log("Erro ao atualizar os dados")
                        return
                    }

                    atualization()
                    setRegistration(data[0])
                })

        }
    }, [lifes])

    //FUNÇÃO P/ATUALIZAR O LEVEL DE ESTAGIO DO USUÁRIO NO CURSO
    React.useEffect(() => {
        try {
            if (phase >= stageContent.length && stageContent.length > 0 && actual === true) {

                const progress = {
                    stageLvl: registration.level_stage + 1,
                    registrationId: registration.id_registration
                }

                progressUpdate(progress)
                    .then((data) => {
                        if (!data) {
                            console.log("Erro ao atualizar os dados")
                            return
                        }
                        atualization()
                        setRegistration(data[0])
                        setFinish(true)
                    })

                return
            }

            if (phase > 0 && first === false && actual === true) {
                const progress = {
                    phase: phase,
                    registrationId: registration.id_registration
                }

                phaseUpdate(progress)
                    .then((data) => {
                        if (!data) {
                            console.log("Erro ao atualizar os dados")
                            return
                        }
                        atualization()
                        setRegistration(data[0])
                    })
            }
        } catch {
            []
        }
    }, [phase])

    React.useEffect(() => {
        try {
            if (phase >= stageContent.length && stageContent.length > 0 && actual === true) {
                getDataUser()
                    .then((data) => {
                        if (!data) {
                            console.log("Erro ao puxar dados do usuário")
                            return
                        }

                        let user = data

                        let progress = {
                            userLevel: user._level,
                            totalExp: user.total_exp + points,
                            userId: user.id_user
                        }


                        if (progress.totalExp >= 10) {
                            while (progress.totalExp >= 10) {
                                progress.totalExp -= 10
                                progress.userLevel += 1
                            }
                        }

                        user._level = progress.userLevel
                        user.total_exp = progress.totalExp

                        levelUpdate(progress)
                            .then((result) => {
                                if (result === false) {
                                    console.log("Erro ao atualizar info do usuário.")
                                    return
                                }
                                atualization()

                                storeUserData({ user: user })
                                    .then((res) => {
                                        if (!res) {
                                            console.log("Erro ao armazenar os dados do usuário")
                                            return
                                        }
                                        console.log("Dado atualizados com sucesso.")
                                    })
                            })

                    })

                return
            }

            if (registration._points >= 0 && first === false && actual === true) {
                const progress = {
                    points: points,
                    registrationId: registration.id_registration
                }


                pointsUpdate(progress)
                    .then((data) => {
                        if (!data) {
                            console.log("Erro ao atualizar os dados")
                            return
                        }

                        atualization()
                        setRegistration(data[0])
                    })

            }
        } catch { [] }
    }, [points, finish])

    //FUNÇÃO P/TEORIAS POR ESTAGIO
    const getTeoryData = (stageId) => {
        let content = []

        getTeoryByStage(stageId)
            .then((data) => {
                if (!data) {
                    console.log("Teoria Inexistente...")
                    getTaskData(stageId, content)
                    return
                }

                data.forEach(element => {
                    content.push(element)
                });

                getTaskData(stageId, content)
            })
    }

    //FUNÇÃO P/RECARREGAR PAG.
    function reload() {
        setStageContent([])
        setStage({})
        setPhase(0)
        setPoints(0)
    }

    //FUNÇÃO P/TASKS POR ESTAGIO
    const getTaskData = (stageId, content) => {
        let stageC = content

        getTaskByStage(stageId)
            .then((data) => {
                if (!data) {
                    console.log("Erro ao bucar dados referentes à task OU task inexistente (?)")
                } else {
                    data.forEach(element => {
                        stageC.push(element)
                    });
                }

                setStageContent(stageC)
            })
    }

    function onPressing(state, shield) {
        shield === true ? setType("shield") : []

        if (state === 1) {
            setPhase(phase + 1)
            lifes > 0 && actual === true ? setPoints(points + 1) : []
            setTransition(true)
        } else if (state === 3) {
            setLost(true)
            setTimeout(() => {
                setLost(false)
                if (actual === true) {
                    setType("heart")
                    shield === true || lifes <= 0 ? [] : setLifes(lifes - 1)
                }
            }, 2000);
        } else if (state === 4) {
            setPhase(phase + 1)
        }

        setFirst(false)
    }

    React.useEffect(() => {
        if (transition === true) {
            setTimeout(() => {
                setTransition(false)
            }, 2000);
        }
    }, [transition])

    //CRIAÇÃO DE ELEMENTOS COM SEU RESPECTIVO "TIPO" (?)
    const listContent = stageContent.length > 0 ? stageContent.map((e, i) => {
        switch (e.id_operation) {
            case 1:
                return (
                    <BasicAct _points={points} _lifes={actual === true ? lifes : -1} task={e} press={(e) => onPressing(e, false)} />
                )
            case 2:
                return (
                    <IntermediaryAct _points={points} _lifes={actual === true ? lifes : -1} task={e} press={(e) => onPressing(e, false)} />
                )
            case 3:
                return (
                    <AdvancedAct _points={points} _lifes={actual === true ? lifes : -1} task={e} press={(e, shield) => onPressing(e, shield)} />
                )
        }
        if (!e.id_operation) {
            return (
                <View key={i} style={{ flex: 1, flexDirection: 'column', padding: 15 }}>
                    <Details data={e} />
                    <Button style={{ height: "auto", width: "90%", alignSelf: 'center', marginTop: 20 }} onPress={() => onPressing(4, "false")} mode='contained'>Avançar</Button>
                </View>
            )
        }
    }) : []

    function qtdCount() {
        let temp = 0

        stageContent.map((e, i) => {
            if (e.id_operation) {
                temp += 1
            }
        })

        return temp
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {listContent.length > 0 && transition === false && phase < stageContent.length ?
                    <>
                        <Animatable.View style={{ width: '100%', flex: 1 }} animation="fadeIn" duration={1000} delay={500}>
                            {listContent[phase]}
                        </Animatable.View>
                        <View style={{ position: 'absolute', width: '100%', height: '100%', top: '35%' }}>
                            <Achievement visible={achivementV} />
                        </View>
                    </>
                    : <></>}

                {phase >= stageContent.length && stageContent.length > 0 && transition === false && (
                    <View style={{ flex: 1, width: '100%' }}>
                        <View style={styles.final}>
                            <FinalStatistics state={actual} qtdTask={stageContent.length > 0 ? qtdCount() : 0} _lifes={actual === true ? lifes : 0} _points={points} />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button style={styles.button} onPress={() => navigation.navigate("Stages", { course: course, registration: registration })} mode='contained'>Estágios</Button>
                            <Button style={styles.button} onPress={() => navigation.navigate("Tabs", { changed: true })} mode='contained'>Home</Button>
                        </View>
                    </View>
                )}

                {lost === true && transition === false && (
                    <Animatable.View animation='bounceIn' style={styles.broken}>
                        {type === "heart" ? <>
                            <FontAwesome5
                                name="heart-broken"
                                size={160}
                                color='#06c244'
                            />
                            <Text style={actual === true && lifes > 0 ? styles.txt_points : styles.txt_noP}> {actual === true && lifes > 0 ? "-1" : "No Lifes"}</Text>
                        </> : <>
                            <Feather
                                name="shield-off"
                                size={160}
                                color='#06c244'
                            />
                            <Text style={styles.txt_noP}> {actual === true && lifes > 0 ? "Shield Break" : "No Shield"}</Text>
                        </>}
                    </Animatable.View>
                )}

                {transition === true && (
                    <Animatable.View animation="bounceIn" style={styles.gain}>
                        <MaterialCommunityIcons
                            name="cards-diamond-outline"
                            size={160}
                            color="#06c244"
                        />
                        <Text style={actual === true && lifes > 0 ? styles.txt_points : styles.txt_noP}> {actual === true && lifes > 0 ? "+1" : "No Points"} </Text>
                    </Animatable.View>
                )}
            </View>
        </View>
    );
}