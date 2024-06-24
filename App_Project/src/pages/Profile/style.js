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
        margin: 15,
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
        height: 210,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: 'center',
    },
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 70,
    },
    placeholderImage: {
        width: 120,
        height: 120,
        borderRadius: 70,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderWidth: 1,
        borderColor: '#06c244',
        width: '97%',
        borderRadius: 10,
        margin: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    options: {
        width: "100%",
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 0.4,
        width: "100%",
        padding: 8,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    infoTitle: {
        color: '#06c244',
        fontSize: RFValue(14),
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily: 'monospace',
    },
    infoSubTitle: {
        color: '#06c244',
        fontSize: RFValue(12),
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily: 'monospace',
    },
    achievement_card: {
        padding: 10,
        width: "100%",
        height: 120,
        backgroundColor: 'gray',
        borderRadius: 10,
        justifyContent: 'space-evenly',
    },
    card_title: {
        width: '98%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderBottomWidth: 0.5,
        paddingBottom: 5
    },
    achievement_title: {
        color: '#06c244',
        fontSize: RFValue(16),
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: 'sans-serif-condensed',
    },
    achievement_subTitle: {
        color: 'black',
        fontSize: RFValue(10),
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: 'sans-serif-thin',
    },
});