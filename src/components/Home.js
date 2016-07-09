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
        <TouchableOpacity onPress={goToEvents}>
          <Text style={styles.surpriseMe}>Surprise Me!</Text>
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
  surpriseMe: {
    color: 'white',
    marginTop: 100,
    fontSize: 30,
    borderWidth: 1,
    borderColor: 'white',
    padding: 5
  },
});
