import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        padding: '5%',
        flexGrow: 1
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
    content: {
        backgroundColor: '#000',
        paddingHorizontal: '3%',
        paddingVertical: '1%',
        alignItems: 'center'
    },
});