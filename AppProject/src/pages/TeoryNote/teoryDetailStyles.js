import { StyleSheet } from 'react-native';

export const teoryDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',  // fundo preto
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#06c244',  // letras verdes
        marginBottom: 20,
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
        color: '#06c244',  // letras verdes
    },
    input: {
        backgroundColor: '#000',  // fundo preto
        borderRadius: 10,  // bordas arredondadas
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#06c244',  // botão verde
        marginTop: 20,
        borderRadius: 10,  // bordas arredondadas
    },
    buttonText: {
        color: '#000',  // letras pretas
    },
});
