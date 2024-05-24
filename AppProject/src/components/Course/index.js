import * as React from 'react';
import { styles } from './style';
import { View, ScrollView, TouchableOpacity } from 'react-native';

import { List } from 'react-native-paper';

export function Course({ course, handlerOnPress }) {

  const listCourses = !course ? [] : course.map((element, index) => {
    return (
      <View style={styles.button} key={index} id={index}>
        <TouchableOpacity
          onPress={() => handlerOnPress(element)}
        >
          <List.Item
            title={element._course}
            titleStyle={styles.title}
          />
        </TouchableOpacity>
      </View>
    )
  });

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {listCourses}
    </ScrollView>
  );
}
