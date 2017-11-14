import React from 'react'
import { View, ScrollView, StyleSheet, Text } from 'react-native'

import { Container, ContainerSection, Button } from './common/'
import TextLink from './TextLink'

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
    const { linkContainerStyle, headerTextStyle, subHeaderTextStyle } = styles;
    const { headerText, onButtonPress } = this.props;

    return (
      <ScrollView>
        <Text style={headerTextStyle}>
          {headerText}
        </Text>

        <ContainerSection>
          <Text style={subHeaderTextStyle}>Locais</Text>
        </ContainerSection>

        <View style={linkContainerStyle}>
          {this.renderLinks(links["mainSection"])}
        </View>

        <ContainerSection>
          <Text style={subHeaderTextStyle}>Salas Especiais</Text>
        </ContainerSection>

        <View style={linkContainerStyle}>
          {this.renderLinks(links["subSection"])}
        </View>

        <ContainerSection>
          <Button onPress={onButtonPress} text="Fechar" color="#FFECE9" backgroundColor="#A61700"/>
        </ContainerSection>
      </ScrollView>
    );
  }
}


ModalContents.defaultProps = {
  headerText: 'Modal Contents',
  onLinkPress: (() => console.log('[default] link pressed!')),
  onButtonPress: (() => console.log('[default] button press!'))
}

const styles = StyleSheet.create({
  linkContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 5
  },
  headerTextStyle:{
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    paddingLeft: 15
  },
  subHeaderTextStyle:{
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 15
  }
});

export default ModalContents;
