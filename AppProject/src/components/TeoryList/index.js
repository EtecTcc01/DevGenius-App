import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './style';

export function TeoryList() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>CADERNO TEÓRICO</Text>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>HTML</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>JavaScript</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SQL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Node.Js</Text>
            </TouchableOpacity>
        </View>
      );
    };

export default TeoryList;