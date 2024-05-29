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
            console.log(res.data.stage)
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

export {
    getCourseByGroup,
    getAllTeoryByGroupOrdened,
    getRegistrationForStages,
    getAllUserGroups,
    getStagesByCourse,
    getAllTeoryByCourse,
    progressUpdate,
    getAllTeoryByGroup,
    getRegistrationByGroup
}