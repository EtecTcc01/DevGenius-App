import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    title: {
        fontSize: RFValue(20),
        fontWeight: "bold",
        alignSelf: "flex-start",
        color: '#06c244',
    },
    item: {
        width: "100%",
        backgroundColor: "transparent",
        margin: 0
    },
    item_title: {
        fontSize: RFValue(15),
        fontWeight: "condensed"
    }
});
