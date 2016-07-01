'use strict';

import { AppRegistry } from 'react-native';
import Blackwall from './src/root';

console.ignoredYellowBox = [
  // FIXME: https://github.com/facebook/react-native/issues/1501
  'Warning: ScrollView doesn\'t take rejection well - scrolls anyway',
];

AppRegistry.registerComponent('Blackwall', () => Blackwall);
