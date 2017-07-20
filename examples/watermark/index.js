// @flow

import React from 'react';
import { ScrollView, Text } from 'react-native';
import Watermark from '../../src/Watermark';

class WatermarkEx extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.head}>
          个人信息：
        </Text>
        <Text style={styles.content}>
          ————————————————————{'\n\n'}
          ————————————————————{'\n\n'}
          ————————————————————{'\n\n'}
          ————————————————————{'\n\n'}
          ————————————————————{'\n\n'}
          ————————————————————{'\n\n'}
          ————————————————————{'\n\n'}
          ————————————————————{'\n\n'}
        </Text>
        <Watermark top={40} left={0}>
          <Text style={[styles.waterText, { color: '#a50091' }]}>
            保密
          </Text>
        </Watermark>
        <Watermark top={160} left={-50}>
          <Text style={[styles.waterText, { width: 470 }]} numberOfLines={1}>
            张丹8021610002
          </Text>
        </Watermark>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'rgb(252, 251, 245)',
  },
  head: {
    fontSize: 20,
    padding: 15,
    paddingBottom: 0,
    fontWeight: '600',
  },
  content: {
    padding: 15,
  },
  waterText: {
    fontSize: 60,
    color: 'rgba(0, 0, 0, .2)',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
};

export default WatermarkEx;
