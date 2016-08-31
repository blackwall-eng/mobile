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
    event: () => Relay.QL`
      query {
        event(id: $eventID)
      }
    `,
  };
  static routeName = 'EventRoute';
}
