import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    title: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        fontFamily: 'monospace',
        textAlign: 'center',
        alignSelf: 'center',
        marginLeft: 15
    },
    item: {
        alignSelf: "center",
        backgroundColor: "white",
        borderRadius: 5,
        width: '93%',
        minWidth: 340,
        margin: 3, 
        justifyContent: 'center',
        minHeight: 65,
    },
    item_title: {
        fontSize: RFValue(17),
        fontFamily: 'sans-serif-condensed'
    },
    title_points: {
        fontSize: RFValue(15),
        fontWeight: "bold",
        fontFamily: 'monospace',
        textAlign: 'center',
        alignSelf: 'center',
        marginLeft: 15
    }
});
