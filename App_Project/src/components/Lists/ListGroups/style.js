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
        alignSelf: "flex-start",
        color: '#06c244'
    },
    item: {
        alignSelf: "center",
        backgroundColor: "white",
        borderRadius: 5,
        width: "92%",
        margin: 8
    },
    item_title: {
        fontSize: RFValue(15),
        fontWeight: "condensed"
    }
});
