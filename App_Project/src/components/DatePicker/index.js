import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export function DatePicker({ handleChoice }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        handleChoice(date)
        hideDatePicker();
    };

    return (
        <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
            <Button onPress={showDatePicker} mode="contained-tonal" style={{ width: "100%", borderRadius: 10 }}>Data de nascimento</Button>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};