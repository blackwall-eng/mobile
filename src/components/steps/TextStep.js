'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import CheckButton from '../CheckButton';
import DidItButton from '../DidItButton';

class TextStep extends Component {

  render() {
    const { step, color, onDone, isLastStep } = this.props;

    const completeStepButton = isLastStep ? <DidItButton color={color} onPress={onDone} /> : <CheckButton color={color} onPress={onDone} />;

    return (
      <View style={styles.container}>
        <Text style={[styles.text, {color: color}]}>
          {step.text}
        </Text>
        {completeStepButton}
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    marginHorizontal: 40,
    lineHeight: 30,
  },
});
