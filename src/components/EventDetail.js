'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import NoImage from './noimagefound.jpg';

import EventListItem from './EventListItem';

import Step from './Step';
import StepMutation from '../mutations/StepMutation';

class EventDetail extends Component {

  render() {
    const { navigator, story } = this.props;
    const event = story.event;

    const goBack = () => navigator.pop();

    const image = event.image ? {uri: event.image} : NoImage;

    const categoryColor = event.categories.edges[0].node.color;

    const onStepDone = () => {
      this.props.relay.commitUpdate(
        new StepMutation(this.props)
      );
    }

    const standardView = (
      <View style={styles.container}>
        <Image source={image} style={styles.image}>
          <LinearGradient colors={['transparent','transparent', 'white']} style={styles.imageForeground}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.title}>{'<'}</Text>
            </TouchableOpacity>
            <View style={styles.eventListItemContainer}>
              <EventListItem event={event} />
            </View>
          </LinearGradient>
        </Image>
        <View style={styles.stepContainer}>
          { story.currentStepNumber === 1 ? (
            <View style={styles.labelRow}>
              <Text style={{marginHorizontal: 5}}>Sun</Text>
              <Text style={{marginHorizontal: 5}}>Multi</Text>
              <Text style={{marginHorizontal: 5}}>Nice</Text>
            </View>
          ) : null }
          <Step step={story.currentStep} color={categoryColor} onDone={onStepDone} />
          <Text style={{marginBottom: 20}}>{'•'}{'•'}{'•'}{'•'}</Text>
        </View>
      </View>
    );

    if (story.currentStepNumber > event.numberOfSteps) {
      return (
        <View style={{flex: 1}}>
          {standardView}
          <View style={[styles.overlayContainer, {backgroundColor: categoryColor}]} />
          <View style={styles.overlayContentContainer}>
            <View style={{height: 150, width: 150, backgroundColor: 'white'}}/>
            <Text style={styles.overlayText}>Remember this experience until next time</Text>
          </View>
        </View>
      );
    }

    return standardView;
  }
}

export default Relay.createContainer(EventDetail, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        name,
        ${StepMutation.getFragment('viewer')}
      }
    `,
    story: () => Relay.QL`
      fragment on Story {
        currentStep {
          ${Step.getFragment('step')}
        },
        currentStepNumber,
        ${StepMutation.getFragment('story')}
        event {
          title,
          subtitle,
          image,
          numberOfSteps,
          categories(first: 1) {
            edges {
              node {
                color
              }
            }
          },
          ${EventListItem.getFragment('event')},
        }
      }
    `,
  },
});

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginTop: 25,
    marginLeft: 20,
    height: 60,
    width: 60,
    alignSelf: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 22,
  },
  image: {
    width: width,
    height: height / 1.75,
  },
  imageForeground: {
    width: width,
    height: height / 1.75,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  eventListItemContainer: {
    marginHorizontal: 20,
    marginBottom: 35,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  labelRow: {
    flexDirection: 'row'
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0.9
  },
  overlayContentContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  overlayText: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    marginHorizontal: 80,
    marginTop: 50,
    lineHeight: 30,
    color: 'white'
  }
});
