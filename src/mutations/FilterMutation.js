'use strict';

import Relay from 'react-relay';

export default class FilterMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        userID,
        activeFilterCategories(first: 50) {
          edges {
            node {
              name
            }
          }
        }
      }
    `,
    category: () => Relay.QL`
      fragment on Category {
        id,
        name
      }
    `
  };
  getMutation() {
    // Here, viewerDoesLike is guaranteed to be available.
    // We can use it to make this mutation polymorphic.
    const { viewer, category } = this.props;

    return viewer.activeFilterCategories.edges.find(n => n.node.name === category.name) === undefined
      ? Relay.QL`mutation {addCategoryFilter}`
      : Relay.QL`mutation {removeCategoryFilter}`;
  }

  // Use this method to prepare the variables that will be used as
  // input to the mutation. Our ‘likeStory’ mutation takes exactly
  // one variable as input – the ID of the story to like.
  getVariables() {
    const { viewer, category } = this.props;
    return {
      userID: viewer.userID,
      categoryName: category.name
    };
  }

  getFatQuery() {
    const { viewer, category } = this.props;

    return viewer.activeFilterCategories.edges.find(n => n.node.name === category.name) === undefined
      ? Relay.QL`
        fragment on AddFilterCategoryPayload {
          viewer {
            activeFilterCategories,
            events
          },
          category
        }
      `
      : Relay.QL`
        fragment on RemoveFilterCategoryPayload {
          viewer {
            activeFilterCategories,
            events
          },
          category {
            id
          }
        }
      `;
  }

  getConfigs() {
    const { viewer, category } = this.props;

    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {viewer: viewer.id, category: category.id},
    }];
  }
}
