// @flow

import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import LoadRenderer from '../../src/LoadRenderer';

function createCase(query) {
  class Loading extends React.Component {
    renderChild = (result: Object) => {
      return (
        <View>
          <Text style={styles.successText}>
            {result.message}
          </Text>
        </View>
      );
    }

    render() {
      return (
        <LoadRenderer
          query={query}
          render={this.renderChild}
          style={{ height: 200 }}
        />
      );
    }
  }

  return Loading;
}

function promiseDelay(callback: Function, timeout: number) {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(callback());
        } catch (err) {
          reject(err);
        }
      }, timeout);
    });
  };
}

const Failure = createCase(promiseDelay(() => {
  throw new Error('查询失败了');
}, 1000));

const Success = createCase(promiseDelay(() => {
  return { status: LoadRenderer.OK, message: '查询成功！' };
}, 2000));

const NoData = createCase(promiseDelay(() => {
  return { status: LoadRenderer.NODATA };
}, 3000));

export default function LoadingCases() {
  return (
    <ScrollView style={styles.container}>
      <Failure />
      <Success />
      <NoData />
    </ScrollView>
  );
}

const styles = {
  container: {
    backgroundColor: 'rgb(252, 251, 245)',
  },
  successText: {
    fontSize: 20,
    color: '#09bb07',
    textAlign: 'center',
  },
};
