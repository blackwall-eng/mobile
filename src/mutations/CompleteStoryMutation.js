'use strict';

import Relay from 'react-relay';

export default class CompleteStoryMutation extends Relay.Mutation {
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
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation {completeStory}`;
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
      fragment on CompleteStoryPayload {
        story
      }
    `;
  }

  getOptimisticResponse() {
    const { story } = this.props;

    return {
      story: {
        id: story.id,
        finishTime: new Date()
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
