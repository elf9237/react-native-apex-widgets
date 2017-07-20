// @flow

import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import Icon from './failure.png';

class Retry extends React.Component {
  props: {
    onPress: Function,
    error: any,
  };

  render() {
    const {
      error,
      onPress,
    } = this.props;

    const message = typeof error === 'object' ? error.message : (error || '出错了');

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
      >
        <Image source={Icon} />
        <Text style={styles.message}>{message}, 点击重试。</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#111',
  },
};

export default Retry;
