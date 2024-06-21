import axios from 'axios';

//O código abaixo é usado para o localhost (Não funciona com o expo go), 
//apenas para isso. Há outras opções abaixo, ent utilize o banco local (instruções no back-end)

// const api = axios.create({
//   baseURL: 'http://localhost:3333/devgenius'
// });

// Para funcionar no mobile, tem que estar na mesma rede, ao inves do localhost
// Para usar sua maquina como receptaculo, pegue seu ip (ipconfig no cmd) e esteja na mesma rede
// VERIFIQUE O IP QUE ESTÁ NO METRO DO EXPO (SEM UTILIZAR NPX EXPO START --TUNNEL)

const api = axios.create({
  baseURL: 'http://172.16.1.109:3000/devgenius'
});

//Utilizando o codigo abaixo, há como usar o app com o banco e back-end na nuvem
//Caso tenham curiosidade, eu usei o railway pro banco e render pro back-end

// const api = axios.create({
//   baseURL: 'https://tcc-render-hospeder.onrender.com/devgenius'
// });

//UTILIZANDO NGROK PRA ACESSAR O BACK-END LOCAL (PODE MUDAR O HTTP)
// const api = axios.create({
//   baseURL: 'https://5fdd-45-180-150-77.ngrok-free.app/devgenius'
// });


export default api;