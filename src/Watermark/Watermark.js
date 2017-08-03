// @flow

import React from 'react';
import { View } from 'react-native';

class Watermark extends React.Component {
  props: {
    rotate: string,
    left: number,
    top: number,
    children?: React$Element<any>,
    style?: any,
  };

  static defaultProps = {
    rotate: '-45deg',
    left: 0,
    top: 0,
  };

  render() {
    const {
      rotate,
      left,
      top,
      children,
      style,
    } = this.props;

    const watermarkStyles = [
      styles.watermark,
      { left, top },
      style,
      { transform: [{ rotate }] },
    ];

    return (
      <View style={watermarkStyles} pointerEvents="none">
        {children}
      </View>
    );
  }
}

const styles = {
  watermark: {
    overflow: 'visible',
    position: 'absolute',
  },
};

export default Watermark;
