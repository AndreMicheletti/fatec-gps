import React from 'react';
import { View, ListView, Text } from 'react-native';
import {
  Container,
  ContainerSection,
  Button,
  Header
} from './common';

import BuildingsList from './BuildingsList';

class ModalContents extends React.Component {

  render() {
    const { buttonViewStyle } = styles;
    return (
      <View>
        <Header text={this.props.headerText} textStyle={{ fontSize: 24, paddingBottom: 8 }} />
        <Container style={{ borderColor: '#007aff' }}>
          <BuildingsList />
        </Container>
        <View style={buttonViewStyle}>
          <Button onPress={this.props.onButtonPress} color={"#A61A00"}>
            Fechar
          </Button>
        </View>
      </View>
    );
  }
}

ModalContents.defaultProps = {
  headerText: 'Modal Contents',
  onButtonPress: (() => console.log('[default] button press!'))
};

const styles = {
  buttonViewStyle: {
    marginTop: 10,
    paddingLeft: 10, paddingRight: 10,
    position: 'relative',
    height: 45
  }
};

export default ModalContents;
