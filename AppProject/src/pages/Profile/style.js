import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 25
    },
    titleContainer: {
        color: 'white',
        alignItems: 'center',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    title: {
        color: '#06c244',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cameraIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIconBackground: {
        backgroundColor: 'gray', // Cor de fundo desejada
        borderRadius: 45, // Metade do tamanho do ícone para torná-lo circular
        borderWidth: 2, // Largura da borda
        borderColor: 'white', // Cor da borda
        padding: 5, // Espaçamento interno
    },
    profileImageContainer: {
        margin: 25,
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderWidth: 1,
        borderColor: '#06c244',
        width: '97%',
        margin: 15,
        padding: 5,
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        padding: 10,
        top: 60
    },
    progressInfo: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: 25,
        marginBottom: 25,
    },
    infoTitle: {
        color: '#06c244',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});