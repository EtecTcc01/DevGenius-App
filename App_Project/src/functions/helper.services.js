// CRIAR UMA FUNCTION COM DIVERSAS REQUISIÇÕES SEM RESTRIÇÃO DE TABELA OU CONTEXTO
import api from "../../api";

//FUNÇÃO P/BUSCAR TODOS OS GRUPOS DO USUÁRIO
const getAllUserGroups = async ({ userId }) => {
    let validation = false
    let groups = []

    await api.get(`/group/userGroups/${userId}`)
        .then((res) => {
            groups = res.data.group
            validation = true
            // if (res.data.group !== undefined) {
            //     setGroup(true)
            // }
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
            return
        })

    if (validation == true) {
        return groups
    }
}

//FUNÇÃO P/BUSCAR CURSOS PELO ID DE GRUPO
const getCourseByGroup = async (groupId) => {
    let validation = false
    let courses = []

    await api.get(`/course/by/group/${groupId}`)
        .then((res) => {
            courses = res.data.course
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return courses
    }
};

//FUNÇÃO P/BUSCAR CURSOS (ORDENADOS) COM TEORIAS PELO ID DE GRUPO
const getAllTeoryByGroupOrdened = async (groupId) => {
    let validation = false
    let courses = []

    await api.get(`/teory/by/group/ordened/${groupId}`)
        .then((res) => {
            courses = res.data.teory
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return courses
    }
}

//FUNÇÃO P/BUSCAR REGISTRO DE CURSOS/USER PELO ID DO CURSO
const getRegistrationForStages = async (userId, courseId) => {
    const dataIds = [userId, courseId]

    let validation = false
    let registration = []

    await api.get(`/registration/for/stages/${dataIds}`)
        .then((res) => {
            registration = res.data.registration
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return registration
    }
}

//FUNÇÃO P/BUSCAR ESTAGIOS POR CURSO
const getStagesByCourse = async (courseId) => {
    let validation = true
    let stages = []

    await api.get(`stage/by/course/${courseId}`)
        .then((res) => {
            stages = res.data.stage
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return stages
    }
}

//FUNÇÃO P/BUSCAR TODOS OS CURSOS (NÃO ORDENADOS) PELO ID DO CURSO
const getAllTeoryByCourse = async (courseId) => {
    let validation = false
    let teory = []

    await api.get(`teory/by/course/${courseId}`)
        .then((res) => {
            teory = res.data.teory
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return teory
    }
}

//FUNÇÃO P/BUSCAR TODOS OS CURSOS (NÃO ORDENADOS) PELO ID DO CURSO
const getAllTeoryByGroup = async (groupId) => {
    let validation = false
    let teory = []

    await api.get(`teory/by/group/${groupId}`)
        .then((res) => {
            teory = res.data.teory
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return teory
    }
}

const progressUpdate = async (progress) => {
    let validation = false
    let registration = []

    await api.put("/registration/level", progress)
        .then((res) => {
            registration = res.data.registration
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return registration
    }
}

const levelUpdate = async (progress) => {
    let validation = false

    await api.put("/info/level", progress)
        .then((res) => {
            console.log("Info atualizado com sucesso.")
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    return validation
}

const lifesUpdate = async (progress) => {
    let validation = false
    let registration = []

    await api.put("/registration/lifes", progress)
        .then((res) => {
            registration = res.data.registration
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return registration
    }
}

const phaseUpdate = async (progress) => {
    let validation = false
    let registration = []

    await api.put("/registration/phase", progress)
        .then((res) => {
            registration = res.data.registration
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return registration
    }
}
const pointsUpdate = async (progress) => {
    let validation = false
    let registration = []

    await api.put("/registration/points", progress)
        .then((res) => {
            registration = res.data.registration
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return registration
    }
}

const getRegistrationByGroup = async (userId, groupId) => {
    const dataIds = [userId, groupId]

    let validation = false
    let registration = []

    await api.get(`/registration/by/group/${dataIds}`)
        .then((res) => {
            registration = res.data.registration
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return registration
    }
}

const getAllUserRanks = async () => {
    let validation = false
    let users = []

    await api.get(`/user/rank`)
        .then((res) => {
            users = res.data.user
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
            return
        })

    if (validation == true) {
        return users
    }
}

const getAllUserAchievements = async (userId) => {
    let validation = 0
    let achievement = []

    try {
        let test = await api.get(`/achievement/by/user/${userId}`)
        console.log({test: test.data})

        if (test.data.achievement) {
            achievement = test.data.achievement
            validation = 1
        } else {
            validation = 2
        }
    } catch (error) {
        console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
        return
    }

    // api.get(`/achievement/by/user/${userId}`)
    //     .then((res) => {
    //         if (res.data.achievement) {
    //             achievement = res.data.achievement
    //             validation = 1
    //         } else {
    //             validation = 2
    //         }
    //     }).catch((error) => {
    //         console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
    //         return
    //     })

    if (validation === 1) {
        return { achievement, validation }
    }

    return { validation, achievement }
}

const userAchievementRegister = async (userId, achievementId) => {
    let validation = false

    let reward = {
        userId: userId,
        achievementId: achievementId
    }

    await api.post("/achievement/user/register", reward)
        .then((res) => {
            console.log(res.data.message)
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    return validation
}

export {
    getCourseByGroup,
    getAllTeoryByGroupOrdened,
    getRegistrationForStages,
    getAllUserGroups,
    getStagesByCourse,
    getAllTeoryByCourse,
    progressUpdate,
    getAllTeoryByGroup,
    getRegistrationByGroup,
    lifesUpdate,
    phaseUpdate,
    pointsUpdate,
    getAllUserRanks,
    levelUpdate,
    getAllUserAchievements,
    userAchievementRegister
}