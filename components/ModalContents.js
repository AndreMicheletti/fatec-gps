import React from 'react'
import { View, ScrollView, StyleSheet, Text } from 'react-native'
import TextLink from './TextLink'
import { Container, ContainerSection, Button } from './common/'

class ModalContents extends React.Component {
  render() {

    const { scrollStyle, headerTextStyle } = styles;

    return (
      <Container>
        <ContainerSection>
          <Text style={headerTextStyle}>Legenda</Text>
        </ContainerSection>

        <ScrollView style={scrollStyle}>
          <TextLink text='Biblioteca' onPress={() => this.props.showMaker('biblioteca') } />
          <TextLink text='Secretaria Geral' onPress={() => this.props.showMaker('secretaria') } />
          <TextLink text='Laboratorios de Informática' onPress={() => this.props.showMaker('informatica') } />
          <TextLink text='Departamento Geral' onPress={() => this.props.showMaker('dpt_geral') } />
          <TextLink text='Departamento de Estágio' onPress={() => this.props.showMaker('estagio') } />
          <TextLink text='Departamento de Mecanica' onPress={() => this.props.showMaker('mecanica') } />
          <TextLink text='Departamento de Edificios' onPress={() => this.props.showMaker('edificio') } />
        </ScrollView>

        <ContainerSection>
          <Button onPress={this.props.onButtonPress} text="Fechar" color="#e74c3c"/>
        </ContainerSection>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scrollStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  headerTextStyle:{
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    paddingLeft: 15
  }
});

export default ModalContents;
