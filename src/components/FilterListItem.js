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

  render() {
    const { category } = this.props;

    return (

      <View>
        <Text style={styles.element}>
          {category.name}
        </Text>
      </View>
    );
  }
}

/*export default Relay.createContainer(FilterListItem, {
  fragments: {
    category: () => Relay.QL`
      fragment on Category {
        name,
        color
      }
    `,
  },
});*/

const styles = StyleSheet.create({
  element: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    color: '#FFFFFF',
    fontSize: 23,
    padding: 10,
    marginBottom: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25
  }
});
