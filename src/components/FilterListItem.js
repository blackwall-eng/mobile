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

      <View style={styles.container}>

      <View style={styles.circle}/>
        <Text style={styles.title}>
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
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 1,
    paddingTop: 22,
    paddingRight: 20,
    paddingLeft: 60,
    paddingBottom: 13,
  },
  title: {
    fontFamily: 'Helvetica',
    fontWeight: '500',
    color: '#252525',
    fontSize: 16,
    marginBottom: 2
  },
  subtitle: {
    color: 'grey',
    fontSize: 14,
  },
  circle: {
    flex: 0,
    backgroundColor: '#00AFFF',
    height: 10,
    width: 10,
    borderRadius: 5,
    marginLeft: -31,
    marginTop: 14,
    position: 'absolute',

  }
});
