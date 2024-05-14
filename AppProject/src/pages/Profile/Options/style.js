import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'black',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    title: {
        color: '#06c244',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        marginTop: 8,
        color: '#06c244',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 8,
        padding: 8,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white',
        width: "65%",
        marginRight: 15
    },
    button: {
        marginTop: 16,
        backgroundColor: '#06C244',
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
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
        padding: 8,
        borderRadius: 6,
        alignItems: 'center',
        width: '30%',
        marginTop: 8
    }
});
