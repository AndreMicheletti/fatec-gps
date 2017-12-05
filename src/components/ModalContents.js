import React from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import {
  Container,
  ContainerSection,
  Button,
  Header
} from './common';

import BuildingsList from './BuildingsList';

class ModalContents extends React.Component {

  render() {

    return (
      <View>
        <Header text={this.props.headerText} />
        <Container>
          <BuildingsList />
        </Container>
      </View>
    );
  }
}

ModalContents.defaultProps = {
  headerText: 'Modal Contents',
  onButtonPress: (() => console.log('[default] button press!'))
}

const styles = StyleSheet.create({

});

export default ModalContents;
