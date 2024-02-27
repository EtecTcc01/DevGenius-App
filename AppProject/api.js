import axios from 'axios';

//O código abaixo é usado para o localhost, apenas para isso. Há outras opções abaixo

const api = axios.create({
  baseURL: 'http://localhost:3333/devgenius'
});

// Para funcionar no mobile, tem que estar na mesma rede, ao inves do localhost
// Para usar sua maquina como receptaculo, pegue seu ip (ipconfig no cmd) e esteja na mesma rede

// const api = axios.create({
//   baseURL: 'http://192.168.10.106:3333/devgenius'
// });

//Utilizando o codigo abaixo, há como usar o app com o banco e back-end na nuvem
//Caso tenham curiosidade, eu usei o railway pro banco e render pro back-end

// const api = axios.create({
//   baseURL: 'https://nodejs-deploy-wjz8.onrender.com/devgenius'
// });


export default api;