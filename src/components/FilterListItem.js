'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import FilterMutation from '../mutations/FilterMutation';

class FilterListItem extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      appearActive: false
    };
  };

  componentWillReceiveProps(nextProps) {
    this.setState({appearActive: false});
  }

  render() {
    const { category, active, viewer, color } = this.props;

    const appearActive = active || this.state.appearActive;

    const pressed = () => {
      this.setState({appearActive: !this.state.appearActive});
      this.props.relay.commitUpdate(
        new FilterMutation(this.props)
      );
    }

    const textStyle = appearActive ? [styles.element, {color: color }] : styles.element;
    const containerStyle = appearActive ? [styles.container, styles.elementActive] : styles.container;

    return (
      <View>
        <TouchableOpacity onPress={pressed}>
          <View style={containerStyle}>
            <Text style={textStyle}>
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Relay.createContainer(FilterListItem, {
  fragments: {
    category: () => Relay.QL`
      fragment on Category {
        name,
        ${FilterMutation.getFragment('category')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${FilterMutation.getFragment('viewer')},
      }
    `
  },
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal:18,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22
  },
  element: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    color: '#FFFFFF',
    fontSize: 23,
  },
  elementActive: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  }
});
