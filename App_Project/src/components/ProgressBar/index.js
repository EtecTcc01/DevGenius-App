import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { styles } from '../../components/ProgressBar/styles';

export function ProgressBar() {
    const [activityValue, setActivityValue] = useState(85);
    const [xpValue, setXpValue] = useState(60);

    return (
        <View style={styles.circularProgress}>

            <View style={styles.progressBarContainer}>
                
                <Text style={styles.text}>Seu avanço</Text>
                <CircularProgress
                    radius={90}
                    value={activityValue}
                    color='#2ecc71'
                    fontSize={20}
                    valueSuffix='%'
                    inActiveStrokeColor='#f1c40f'
                    inActiveStrokeOpacity={0.2}
                    inActiveStrokeWidth={6}
                    duration={3000}
                    onAnimationComplete={() => setActivityValue(100)}
                    valuePrefix=''
                />
            </View>

            <View style={styles.progressBarContainer}>
                <Text style={styles.text}>Total de EXP</Text>
                <CircularProgress
                    radius={90}
                    value={xpValue}
                    color='#f1c40f'
                    fontSize={20}
                    valueSuffix=' EXP'
                    inActiveStrokeColor='#e74c3c'
                    inActiveStrokeOpacity={0.2}
                    inActiveStrokeWidth={6}
                    duration={3000}
                    onAnimationComplete={() => setXpValue(80)}
                    valuePrefix=''
                />
            </View>
        </View>
    );
}
