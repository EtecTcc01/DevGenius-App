import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 2,
        backgroundColor: '#111212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },
    screenSwitch: {
        fontFamily: 'sans-serif',
        backgroundColor: '#111212',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: '7%',
        textAlign: 'center'
    },
    title: {
        color: '#06c244',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        marginTop: 35,
        top: '80'
    },
    subTitle: {
        paddingTop: 18,
        color: '#06c244',
        fontFamily: 'Courier',
        fontWeight: 'bold',
        fontSize: 20
    },
    contentTxt: {
        color: '#808080',
        fontFamily: 'sans-serif',
        fontWeight: 550,
        fontSize: 23,
        textAlign: 'center',
        marginTop: 40
    },
    button1: {
        backgroundColor: '#06c244',
        borderRadius: 30,
        marginTop: 150,
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
        // marginBottom: 20,
        bottom: '35%'
    },
    button2: {
        color: '#fff',
        backgroundColor: 'transparent',
        marginTop: 'auto',
        borderRadius: 30,
        borderColor: '#06c244',
        borderWidth: '3px',
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4%',
        bottom: '20%'
    },
    access1: {
        // color: '#000',
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'sans-serif'
    },
    access: {
        color: '#06c244',
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'sans-serif'
    },
    logo: {
        width: 230,
        height: 200
    }
});
