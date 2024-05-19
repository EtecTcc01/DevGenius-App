import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
