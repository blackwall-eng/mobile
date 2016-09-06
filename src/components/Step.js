'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import TextStep from './steps/TextStep';

class Step extends Component {

  render() {
    const { step, color, onDone } = this.props;

    if (!step || !step.__typename) {
      return null;
    }

    switch (step.__typename) {
      case 'TextStep':
        return <TextStep step={step} color={color} onDone={onDone} />;

      default:
        return null;
    }
  }
}

export default Relay.createContainer(Step, {
  fragments: {
    step: () => Relay.QL`
      fragment on Step {
        __typename,
        ${TextStep.getFragment('step')}
      }
    `,
  },
});
