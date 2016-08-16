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

    const textStyle = this.state.pressed ? [styles.element, {color: category.color }] : styles.element;
    const containerStyle = this.state.pressed ? [styles.container, styles.elementActive] : styles.container;

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
        color
      }
    `,
  },
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal:18,
    marginBottom: 28,
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
