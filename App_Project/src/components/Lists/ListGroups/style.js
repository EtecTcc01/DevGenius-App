import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    card: {
        flexDirection: 'row',
        width: '100%',
        margin: 8,
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        alignSelf: "flex-start",
        color: '#06c244'
    },
    choices: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        backgroundColor: "#88b257",
    },
    item: {
        alignSelf: "center",
        width: "80%",
        borderRadius: 5,
        padding: 15,
    },
    item_title: {
        fontSize: RFValue(15),
        fontWeight: "condensed"
    },
    logout: {
        width: '15%',
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#88b257",
    },
    notes: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%'
    }
});
