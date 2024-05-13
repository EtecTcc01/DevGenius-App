import { StyleSheet } from 'react-native';

export const teoryDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',  // fundo preto
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'center', // centralizar conteúdo verticalmente
    },
    title: {
        fontSize: 28, // tamanho do texto aumentado
        fontWeight: 'bold',
        color: '#FFF',  // letras brancas
        marginBottom: 20,
        textAlign: 'center', // centralizar texto horizontalmente
    },
    content: {
        flex: 1,
        backgroundColor: '#000',  // fundo preto
        borderRadius: 10,  // bordas arredondadas
        padding: 20,
    },
    listItem: {
        marginBottom: 10,
        backgroundColor: '#000',  // fundo preto
        borderRadius: 10,  // bordas arredondadas
    },
    listItemTitle: {
        color: '#FFF',  // letras brancas
    },
    input: {
        backgroundColor: '#000',  // fundo preto
        borderRadius: 10,  // bordas arredondadas
        marginBottom: 20,
        color: '#FFF',  // letras brancas
    },
    button: {
        backgroundColor: '#FFF',  // botão branco
        marginTop: 20,
        borderRadius: 10,  // bordas arredondadas
    },
    buttonText: {
        color: '#000',  // letras pretas
    },
});
