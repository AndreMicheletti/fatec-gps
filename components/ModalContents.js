import React from 'react'
import { View, ScrollView, StyleSheet, Button, Text } from 'react-native'
import TextLink from './TextLink'

class ModalContents extends React.Component {
  render() {
    return (
      <View style={styles.modalContainer}>
        <View style= {styles.modalText}>
          <Text style= {styles.subtitulo}>Legenda</Text>
          <ScrollView>
            <TextLink text='Biblioteca' onPress={() => this.props.showMaker('biblioteca') } />
            <TextLink text='Secretaria Geral' onPress={() => this.props.showMaker('secretaria') } />
            <TextLink text='Laboratorios de Informática' onPress={() => this.props.showMaker('informatica') } />
            <TextLink text='Departamento Geral' onPress={() => this.props.showMaker('dpt_geral') } />
            <TextLink text='Departamento de Estágio' onPress={() => this.props.showMaker('estagio') } />
            <TextLink text='Departamento de Mecanica' onPress={() => this.props.showMaker('mecanica') } />
            <TextLink text='Departamento de Edificios' onPress={() => this.props.showMaker('edificio') } />
          </ScrollView>
        </View>

        <Button style={styles.closeButtonStyle}
                onPress={this.props.onButtonPress}
                title="Fechar"
                color="#e74c3c"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  },
  modalContainer:{
    flex: 1,
    flexDirection: 'column',
  },
  modalText:{
    marginTop: 22,
    paddingLeft: 15,
    paddingRight: 8,
    flex: 3,
  },
  subtitulo:{
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  closeButtonStyle: {
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    flex: 2
  },
  menuItem: {
    fontSize: 28,
    fontWeight: "400",
    color: 'white'
  }
});

export default ModalContents;
