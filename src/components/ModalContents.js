import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

import { Container, ContainerSection, Button } from './common/';
import ClassroomsList from './ClassroomsList';

import links from '../data/links.json'

class ModalContents extends React.Component {

  renderLinks(linkList) {
    const { onLinkPress } = this.props;

    return linkList.map((item) => {
      const text = item["text"];
      const target = item["target"];
      return (
        <TextLink key={text} text={text} onPress={() => onLinkPress(target)} />
      );
    });
  }

  render() {
    const {
      linkContainerStyle,
      headerTextStyle,
      subHeaderTextStyle,
      floatView
    } = styles;
    const { headerText, onButtonPress } = this.props;

    return (
      <View style={floatView}>

        <Container>
          <ContainerSection>
            <Text style={headerTextStyle}>
              {headerText}
            </Text>
          </ContainerSection>

          <ContainerSection>
            <ClassroomsList />
          </ContainerSection>

          <ContainerSection>
            <Button onPress={onButtonPress} color="#FFECE9" backgroundColor="#A61700">
              Fechar
            </Button>
          </ContainerSection>
        </Container>

      </View>
    );
  }
}


ModalContents.defaultProps = {
  headerText: 'Modal Contents',
  onLinkPress: (() => console.log('[default] link pressed!')),
  onButtonPress: (() => console.log('[default] button press!'))
}

const styles = StyleSheet.create({
  floatView: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  headerTextStyle:{
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 15
  },
});

export default ModalContents;
