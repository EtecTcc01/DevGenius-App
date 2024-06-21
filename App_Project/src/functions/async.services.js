import AsyncStorage from '@react-native-async-storage/async-storage';

// FUNÇÃO DO ASYNC STORAGE P/ARMAZENAR OS DADOS DO USUÁRIO
async function storeUserData({ user }) {
    let validation = false

    try {
        const jsonValue = JSON.stringify(user); //TRANSFORMANDO EM STRING ANTES DE CONVERTER
        await AsyncStorage.setItem('userLogin', jsonValue); //CRIANDO UMA KEY PARA, DEPOIS, BUSCAR OS DADOS NOAVEMENTE
        validation = true
    } catch (error) {
        console.log(`Erro ao salvar dados do usuário. ${error}`)
    }

    if (validation == true) {
        return validation
    }
};

// FUNÇÃO DO ASYNC STORAGE P/ARMAZENAR STATE DE ALTERAÇÃO
async function storeChangedState(state) {
    let validation = false
    let stored = { state: state }

    try {
        await AsyncStorage.setItem('changed', JSON.stringify(stored)); //CRIANDO UMA KEY PARA, DEPOIS, BUSCAR OS DADOS NOAVEMENTE
        validation = true
    } catch (error) {
        console.log(`Erro ao salvar state atual. ${error}`)
    }

    if (validation == true) {
        return validation
    }
};

// FUNÇÃO P/BUSCAR DADOS DO USUÁRIO
async function getDataUser() {
    let validation = false
    let user = []

    await AsyncStorage.getItem('userLogin')
        .then((jsonValue) => {
            jsonValue != null ? user = JSON.parse(jsonValue) : null;
            validation = true
        }).catch((error) => {
            console.log(`Erro ao buscar dados referente ao usuário. ${error}`)
        })

    if (validation == true) {
        return user
    }
};

// FUNÇÃO P/BUSCAR DADOS STATE DE ALTERAÇÃO
async function getChangedState() {
    let validation = false
    let actual = {}

    await AsyncStorage.getItem('changed')
        .then((state) => {
            state != null ? actual = JSON.parse(state) : null;
            validation = true
        }).catch((error) => {
            console.log(`Erro ao buscar state de alteração. ${error}`)
        })

    if (validation == true) {
        return actual.state
    }
};

export {
    storeUserData,
    getDataUser,
    storeChangedState,
    getChangedState,
}