'use strict';
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

export default class Home extends Component {
  propTypes: {
    navigator: PropTypes.func.isRequired
  }

  render() {
    const { navigator } = this.props;

    const goToFilter = () => navigator.push({name: 'Filter'});

    return (
      <View style={styles.container}>
        <Text style={styles.iWantTo}>I want to</Text>
        <TouchableOpacity onPress={goToFilter}>
          <View style={styles.surpriseMeContainer}>
            <Text style={styles.surpriseMe}>do something</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iWantTo: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    height: 50,
    fontSize: 25,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  surpriseMeContainer: {
  	flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 26
  },
  surpriseMe: {
 	color: 'white',
 	fontFamily: 'Helvetica',
    fontWeight: '100',
    height: 50,
    fontSize: 25
  },
});
