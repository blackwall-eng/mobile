'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

export default class FilterListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {pressed: false};
  }

  render() {
    const { category, onPress } = this.props;

    const pressed = () => {
      const isItPressedNow = !this.state.pressed;
      this.setState({pressed: isItPressedNow});
      onPress(isItPressedNow, category);
    }

    const isItPressed = this.state.pressed ? [styles.element, styles.elementActive, {color: category.color }] : styles.element;

    return (
      <View>
        <TouchableOpacity onPress={pressed}>
          <Text style={isItPressed}>
            {category.name}
          </Text>
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
        color
      }
    `,
  },
});

const styles = StyleSheet.create({
  element: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    color: '#FFFFFF',
    fontSize: 23,
    paddingVertical: 8,
    paddingHorizontal:18,
    marginBottom: 28,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22
  },
  elementActive: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  }
});
