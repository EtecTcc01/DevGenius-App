import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        padding: '5%',
        flexGrow: 1
    },
    content: {
        backgroundColor: '#000',
        paddingHorizontal: '3%',
        paddingVertical: '1%',
        alignItems: 'center'
    },
    button: {
        borderRadius: 50, // Tornando o botão redondo
        backgroundColor: '#06c244', // Cor de fundo do botão
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10, // Espaçamento vertical entre os botões
        height: 50, // Altura fixa dos botões
        width: "96%", // Largura fixa dos botões para criar uma bolinha
    },
    // buttonContainer: {
    //     flexDirection: 'column', // Alinhar os botões em uma coluna
    //     alignItems: 'center', // Alinhar os botões no centro horizontal
    //     justifyContent: 'center', // Alinhar os botões no centro vertical
    // },
    // buttonText: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     color: 'white',
    // },
    // line: {
    //     position: 'absolute',
    //     height: '50%', // Ajuste a altura da linha conforme necessário
    //     width: 2, // Largura da linha
    //     backgroundColor: '#fff', // Cor da linha
    // },
});
