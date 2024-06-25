import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    title: {
        textAlign: "left",
        fontSize: RFValue(16),
        color: '#06c244',
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'bold',
        margin: 15,
        width: "100%"
    },
    message: {
        textAlign: "left",
        fontSize: RFValue(13),
        color: '#06c244',
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'bold',
        margin: 15,
        width: "100%"
    },
    achievement_card: {
        padding: 10,
        width: "100%",
        height: 120,
        backgroundColor: 'gray',
        borderRadius: 10,
        margin: 15,
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