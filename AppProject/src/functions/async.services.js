import AsyncStorage from '@react-native-async-storage/async-storage';

// FUNÇÃO DO ASYNC STORAGE P/ARMAZENAR OS DADOS DO USUÁRIO
async function storeUserData({ user }) {
    console.log(user)
    let validation = false

    try {
        const jsonValue = JSON.stringify(user); //TRANSFORMANDO EM STRING ANTES DE CONVERTER
        await AsyncStorage.setItem('userLogin', jsonValue); //CRIANDO UMA KEY PARA, DEPOIS, BUSCAR OS DADOS NOAVEMENTE
        validation = true
    } catch (error) {
        alert(`Erro ao salvar dados do usuário. ${error}`)
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
            alert(`Erro ao buscar dados referente ao usuário. ${error}`)
        })

    if (validation == true) {
        return user
    }
};

export {
    storeUserData,
    getDataUser
}