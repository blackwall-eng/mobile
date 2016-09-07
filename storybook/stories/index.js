import React from 'react';
import { Text } from 'react-native';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';

import CenterView from './CenterView';
import Welcome from './Welcome';

import CheckButton from '../../src/components/CheckButton';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('CheckButton', module)
  .addDecorator(getStory => (
    <CenterView>{getStory()}</CenterView>
  ))
  .add('default', () => (
    <CheckButton onPress={action('clicked-button')} />
  ))
  .add('black', () => (
    <CheckButton color={'black'} onPress={action('clicked-button')} />
  ))
  .add('green', () => (
    <CheckButton color={'green'} onPress={action('clicked-button')} />
  ));
