'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

class TextStep extends Component {

  render() {
    const { step, color } = this.props;

    return (
      <View>
        <Text style={[styles.text, {color: color}]}>
          {step.text}
        </Text>
      </View>
    );
  }
}

export default Relay.createContainer(TextStep, {
  fragments: {
    step: () => Relay.QL`
      fragment on Step {
        ... on TextStep {
          text
        }
      }
    `,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    paddingHorizontal: 40,
    lineHeight: 30,
  },
});
