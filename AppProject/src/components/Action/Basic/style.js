import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#203E2E', // Verde escuro
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    contentA: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        padding: '3%'
    },
    button: {
        width: '90%',
        padding: '4%',
        margin: '2%',
        borderColor: '#06c244',
        borderWidth: 1,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#fff', // Cor de fundo dos botões
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#06c244',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        backgroundColor: "#000", // Fundo preto
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: '#06c244', // Letra verde
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#06c244', // Botão verde
        borderRadius: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: '#000', // Letra preta
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
