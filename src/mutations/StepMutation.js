'use strict';

import Relay from 'react-relay';

import Step from '../components/Step';

export default class StepMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        userID,
      }
    `,
    story: () => Relay.QL`
      fragment on Story {
        id,
        storyID,
        currentStepNumber,
        event {
          steps(first: 50) {
            edges {
              node {
                ${Step.getFragment('step')}
              }
            }
          }
        }
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation {completeStep}`;
  }

  getVariables() {
    const { viewer, story } = this.props;
    return {
      userID: viewer.userID,
      storyID: story.storyID,
    };
  }

  getFatQuery() {
    const { story } = this.props;

    return Relay.QL`
      fragment on CompleteStepPayload {
        story
      }
    `;
  }

  getOptimisticResponse() {
    const { story } = this.props;

    var nextStep = null;
    if (story.event.steps.edges.length > story.currentStepNumber) {
      nextStep = story.event.steps.edges[story.currentStepNumber].node;
    }

    return {
      story: {
        id: story.id,
        currentStepNumber: story.currentStepNumber + 1,
        currentStep: nextStep
      },
    };
  }

  getConfigs() {
    const { story } = this.props;

    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {story: story.id},
    }];
  }
}
