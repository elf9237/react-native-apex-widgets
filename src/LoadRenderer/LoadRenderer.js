// @flow

import React from 'react';
import { View, ActivityIndicator, InteractionManager } from 'react-native';
import NoData from './NoData';
import Retry from './Retry';

type QueryResult = {
  status: 1 | 2,
};

type State = {
  loading: ?boolean,
  result: ?QueryResult,
  error: any,
};

const OK = 1;
const NODATA = 2;

const INIT_STATE = {
  loading: true,
  result: null,
  error: null,
};

class LoadRenderer extends React.Component {
  props: {
    query: () => Promise<QueryResult>,
    render: (result: QueryResult) => React$Element<any>,
    style?: any,
  };

  _isMounted: boolean;

  static defaultProps = {
    query: InteractionManager.runAfterInteractions,
  };

  static OK = OK;
  static NODATA = NODATA;

  state: State = INIT_STATE;

  componentDidMount() {
    this._isMounted = true;
    this.runQuery();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  runQuery = async () => {
    if (!this._isMounted) return;

    this.setState(INIT_STATE);

    const nextState = { ...INIT_STATE };

    try {
      nextState.result = await this.props.query() || {};
    } catch (err) {
      nextState.error = err;
    }
    nextState.loading = false;

    if (this._isMounted) {
      this.setState(nextState);
    }
  }

  render() {
    let child;
    const result = this.state.result || { status: NODATA };

    if (this.state.loading) {
      child = (
        <ActivityIndicator
          style={styles.indicator}
        />
      );
    } else if (this.state.error) {
      child = (
        <Retry
          error={this.state.error}
          onPress={this.runQuery}
        />
      );
    } else {
      child = result.status === NODATA
        ? <NoData /> : this.props.render && this.props.render(result);
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {child}
      </View>
    );
  }
}

const styles = {
  container: {
    height: 200,
    justifyContent: 'center',
  },
  indicator: {
    alignSelf: 'center',
  },
};

export default LoadRenderer;
