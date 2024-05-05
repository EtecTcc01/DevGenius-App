// CRIAR UMA FUNCTION COM DIVERSAS REQUISIÇÕES SEM RESTRIÇÃO DE TABELA OU CONTEXTO
import api from "../../api";

//FUNÇÃO P/BUSCAR TODOS OS ROUPS DO USUÁRIO
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
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
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
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return courses
    }
};

//FUNÇÃO P/BUSCAR CURSOS COM TEORIAS PELO ID DE GRUPO
const getAllTeoryByGroup = async (groupId) => {
    let validation = false
    let courses = []

    await api.get(`/teory/by/group/${groupId}`)
        .then((res) => {
            courses = res.data.teory
            validation = true
        }).catch((error) => {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
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
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })

    if (validation == true) {
        return registration
    }
}

const getStagesByCourse = async (courseId) => {
    let validation = true
    let stages = []

    await api.get(`stage/by/course/${courseId}`)
        .then((res) => {
            stages = res.data.stage
            validation = true
        }).catch((error) => {
            alert(`Erro ao estabelecer conexão com o banco de dados. ${error}`);
            return
        })
    
    if (validation == true) {
        return stages
    }
}

export {
    getCourseByGroup,
    getAllTeoryByGroup,
    getRegistrationForStages,
    getAllUserGroups,
    getStagesByCourse
}