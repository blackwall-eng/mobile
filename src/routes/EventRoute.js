'use strict';

import Relay, {
  Route,
} from 'react-relay';

export default class EventRoute extends Route {
  static paramDefinitions = {
    eventID: {required: true},
  };

  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
    story: () => Relay.QL`
      query {
        story(eventID: $eventID)
      }
    `
  };
  static routeName = 'EventRoute';
}
