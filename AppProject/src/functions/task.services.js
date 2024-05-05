import api from "../../api";

//FUNÇÃO P/BUSCAR TASK PELO ID DO ESTAGIO
const getTaskByStage = async (stageId) => {
    let validation = false
    let task = []

    await api.get(`/task/by/stage/${stageId}`)
        .then((res) => {
            task = res.data.task
            validation = true
        }).catch((error) => {
            alert(`Erro ao pegar os dados da tarefa. ${error}`)
            return
        })

    if (validation == true) {
        return task
    }
}

//FUNÇÃO P/BUSCAR TEORIA PELO ID DO ESTAGIO
const getTeoryByStage = async (stageId) => {
    let validation = false
    let teory = []

    await api.get(`/teory/by/stage/${stageId}`)
        .then((res) => {
            teory = res.data.teory
            validation = true
        }).catch((error) => {
            alert(`Erro ao pegar os dados da teoria. ${error}`)
            return
        })

    if (validation == true) {
        return teory
    }
}

//FUNÇÃO P/BUSCAR RESPOSTAS QUE CORRESPONDEM À TASK PELO ID DA TASK
const getAnswerByTask = async (opRoute, taskId) => { //"opRoute" => ROTA P/OPERAÇÃO DO BACK
    let validation = false
    let answer = []

    await api.get(`/${opRoute}/by/task/${taskId}`)
        .then((res) => {
            answer = res.data.answer[0]
            validation = true
        }).catch((error) => {
            alert(`Erro ao pegar os dados da resposta. ${error}`)
            return
        })

    if (validation == true) {
        return answer
    }

}

export {
    getAnswerByTask,
    getTaskByStage,
    getTeoryByStage
}