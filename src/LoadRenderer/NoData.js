// @flow

import React from 'react';
import { View, Text } from 'react-native';

class NoData extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          暂无数据
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    alignSelf: 'center',
  },
  text: {
    color: 'gray',
  },
};

export default NoData;
