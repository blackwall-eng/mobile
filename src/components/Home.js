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

    const goToEvents = () => navigator.push({name: 'Events'});

    return (
      <View style={styles.container}>
          <Text style={styles.iWantTo}>I want to</Text>
        <TouchableOpacity onPress={goToEvents}>
          <Text style={styles.surpriseMe}>do something</Text>
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
    marginTop: 200,
    height: 50,
    fontSize: 25,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  surpriseMe: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    height: 50,
    fontSize: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 26
  },
});
