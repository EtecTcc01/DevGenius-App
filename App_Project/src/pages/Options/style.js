import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    title: {
        color: '#06c244',
        fontSize: RFValue(15),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        maxWidth: 700,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        marginTop: 8,
        color: '#06c244',
        fontSize: RFValue(10),
        fontWeight: 'bold',
        textAlign: "left",
        alignSelf: "flex-start"
    },
    input: {
        marginTop: 8,
        padding: 8,
        borderColor: 'gray',
        borderWidth: 1,
        color: 'white',
        width: "100%",
    },
    button: {
        marginTop: 16,
        backgroundColor: '#06C244',
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
        width: "90%"
    },
    buttonText: {
        color: 'black',
        fontSize: RFValue(10),
        fontWeight: 'bold',
    },
    manager: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%'
    },
    edit: {
        borderColor: '#06C244',
        borderWidth: 1,
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
        width: '30%',
        marginTop: 8
    }
});
