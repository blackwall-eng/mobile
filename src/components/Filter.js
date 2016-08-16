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
                    {name: 'Challenge', color: null},
                  {name: 'Express', color: null},
                {name: 'Discover', color: null},
              {name: 'Dream', color: null},
            {name: 'Feel', color: null},
          {name: 'Be Inspired', color: null},
        {name: 'Experience', color: null}];
    /*const { edges } = this.props.viewer.events;*/

    const filterList = categories.map(category => {
      return (<FilterListItem key={category.name} category={category} />)
    });

    return (
      <View>
        <Text style={styles.textHeader}>
            Don{"'"}t be shy{"\n"}choose a theme.
        </Text>
        <View style={styles.listing}>
          {filterList}
        </View>
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
  textHeader: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 25,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: 'center',
  },
  listing: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingRight: 20,
   },
});
