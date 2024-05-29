import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    scroll_container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: 'transparent',
        borderColor: '#06c244',
        borderWidth: 3,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        maxWidth: 700,
    },
    titleContainer: {
        color: 'white',
        alignItems: 'center',
        fontSize: RFValue(12),
        marginTop: 16,
        marginBottom: 16,
    },
    title: {
        color: '#06c244',
        fontSize: RFValue(16),
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
        flex: 0.8,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: 'center',
        padding: 30,
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
        margin: 12,
        padding: 10,
    },
    options: {
        flex: 1,
        width: "100%",
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressInfo: {
        width: "100%",
        height: "auto",
        flexDirection: 'column',
        padding: 20,
        margin: 10
    },
    infoTitle: {
        color: '#06c244',
        fontSize: RFValue(15),
        fontWeight: 'bold',
        textAlign: 'center',
    }
});