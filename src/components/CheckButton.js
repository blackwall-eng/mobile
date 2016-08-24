'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Navigator,
  InteractionManager,
  Dimensions
} from 'react-native';

export default class CheckButton extends Component {
  render() {
    const { color, onPress } = this.props;

    const circleColor = color || 'red';

    const outerCircleStyle = [styles.outerCircle, {backgroundColor: circleColor}];
    const shadowCircleStyle = [styles.shadowCircle, {backgroundColor: circleColor}];

    return (
      <TouchableOpacity style={shadowCircleStyle} onPress={onPress}>
        <View style={styles.shadowCircleWhiteForeground}>
          <View style={outerCircleStyle}>
            <View style={styles.innerCircle}>
              <Text style={{color: circleColor, fontSize: 50, backgroundColor: 'transparent'}}>{'✓'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const size = 80;
const shadowSize = 10;
const ringThickness = 7;

const styles = StyleSheet.create({
  shadowCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  shadowCircleWhiteForeground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: size - shadowSize,
    height: size - shadowSize,
    borderRadius: (size - shadowSize) / 2,
  },
  innerCircle: {
    width: size - shadowSize - ringThickness,
    height: size - shadowSize - ringThickness,
    borderRadius: (size - shadowSize - ringThickness) / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
