'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

import FilterListItem from './FilterListItem';

export default class Filter extends Component {

  render() {
    const categories = [{name: 'Enjoy', color: null},
                        {name: 'Face', color: null},
                      {name: 'Reflect', color: null},
                    {name: 'crfeative', color: null},
                  {name: 'crdeative', color: null},
                {name: 'crseativfe', color: null},
              {name: 'creativere', color: null}];
    /*const { edges } = this.props.viewer.events;*/

    const filterList = categories.map(category => {
      return (<FilterListItem key={category.name} category={category} />)
    });

    return (
      <View style={styles.container}>
        <View style={styles.containerTwo}>
        </View>

        {filterList}

      </View>
    );
  }
}

/*export default Relay.createContainer(Filter, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        categories {
          ${FilterListItem.getFragment('category')}
        }
      }
    `,
  },
});*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTwo: {
    marginTop: 110,
  },
});
