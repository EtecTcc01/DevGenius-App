import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        padding: '5%',
    },
    content: {
        backgroundColor: '#000',
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: '1%',
        paddingBottom: '1%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: '7%',
        marginLeft: '7%',
    },
    button: {
        flex: 2,
        borderRadius: 45,
        borderColor: '#06c244',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: "2%",
        minHeight: 100,
        minWidth: '100%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#06c244',
        marginBottom: 10,
    },
});
