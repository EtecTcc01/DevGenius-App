import api from '../../api'; //IMPORT DA API AXIOS

//FUNÇÃO DE REALIZAR LOGIN
async function userLogin({ user }) {
    let dataU = []

    //USO DO BACK-END P/LOGAR
    await api.post('/user/validation', user) //ROTA USADA | DADOS A SEREM RECEBIDOS PELO BACK
        .then((res) => {
            console.log(res.data.message);
            dataU = res.data.user[0]
        }).catch((error) => {
            console.log(`Erro ao logar na conta usuário. ${error}`);
            return
        })

    const data = await getUserData(dataU._id) //REALIZANDO GET NA TABELA DE INFO DO USUÁRIO 

    //VALIDAÇÃO E ENVIO DE DADOS... (CASO DE ERRO -> RETURN Undefined)
    if (!data) {
        console.log("Erro ao buscar as informações do usuário.")
        return
    }

    return data
}

//PEGANDO INFORMAÇÕES DO USUÁRIO COM AXIOS
async function getUserData(userId) {
    let validation = false
    let user = []

    await api.get(`/user/userInfo/${userId}`) //ROTA (COM ID DO USUÁRIO DENTRO P/USO DO GET)
        .then((res) => {
            user = res.data.user[0]
            validation = true
        }).catch((error) => {
            console.log(`Erro ao estabelecer conexão com o banco de dados. ${error}`)
            return
        })

    if (validation == true) {
        return user
    }
};

//FUNÇÃO P/REGISTRAR O USUÁRIO
async function userRegister({ user }) {
    let validation = false
    let data = []

    await api.post('/user/register', user)
        .then((res) => {
            console.log(res.data.message)
            data = res.data.user[0]
            validation = true
        })
        .catch((error) => {
            console.log(`Erro ao cadastrar usuário. ${error}`)
            return
        })

    if (validation == true) {
        return data
    }
}

//FUNÇÃO P/REGISTRAR INFO DO USUÁRIO
async function userRegisterInfo({ info }) {
    let validation = false
    let data = []

    await api.post('/info', info)
        .then((res) => {
            console.log(res.data.message)
            validation = true
        })
        .catch((error) => {
            console.log("Erro ao cadatrar informações do usuário.")
            return
        })

    if (validation == true) {
        data = await getUserData(info.userId)
    }

    if (!data) {
        console.log("Erro ao buscar as informações do usuário.")
        return
    }

    return data
}

export {
    userLogin,
    getUserData,
    userRegister,
    userRegisterInfo
};