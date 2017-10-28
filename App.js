import React, { Component } from 'react';
import { Modal, Text, Button, View, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button'; // https://github.com/mastermoo/react-native-action-button

// marker's vars
var markerTitle = "Secretaria"
var markerDescription = "Edifício Santiago - Térreo"
var markerColor = "rgb(250, 255, 0)"

const fatecRegion = {
  latitude: -23.529202,
  longitude: -46.632795,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
// ######################## MARKERS COORDINATES ########################
// --------------- geral ---------------
const biblioteca = {
  latitude: -23.529888,
  longitude: -46.632472,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const estagio = {
  latitude: -23.530133,
  longitude: -46.632507,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const informatica = {
  latitude: -23.529836,
  longitude: -46.632550,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const secretaria = {
  latitude: -23.530148,
  longitude: -46.632394,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
// ---------------- departamento geral ----------------
const geral = {
  latitude: -23.529875,
  longitude: -46.632373,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
// --------------- outros departamentos ---------------
const edificio = {
  latitude: -23.529546,
  longitude: -46.632362,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const eletronica = { // arrumar
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const hidraulica = { // arrumar
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const materiais = { // arrumar
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const mecanica = {
  latitude: -23.529546,
  longitude: -46.632362,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const processos = { // arrumar
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const projetos = { // arrumar
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const secretariado = { // arrumar
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const soldagem = { // arrumar
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const tecnologia = {
  latitude: -23.530131,
  longitude: -46.632418,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}
const turismo = {
  latitude: -23.529546,
  longitude: -46.632362,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}


export default class App extends Component<{}> {
  // Modal
  state = {
    modalVisible: false,
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <MapView
      style={styles.mapStyle}
      initialRegion={fatecRegion}
      region={fatecRegion}
      scrollEnabled={false}
      rotateEnabled={false}
      zoomEnabled={false}
      pitchEnabled={false}
      minZoomLevel={15}
      maxZoomLevel={25}
      showsUserLocation={true}
      showsMyLocationButton={false}
      >
      <MapView.Marker
      coordinate={{
        latitude: -23.529289,
        longitude: -46.632550,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }}
      title="Prédio A/B - Bloco B"
      />
      <MapView.Marker
      coordinate={{
        latitude: -23.529145,
        longitude: -46.632323,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }}
      title="Prédio A/B - Bloco B"
      />
      <MapView.Marker
      coordinate={{
        latitude: -23.529987,
        longitude: -46.632485,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }}
      title="Edificio Santhiago"
      />
      <MapView.Marker
      coordinate={{
        latitude: -23.530069,
        longitude: -46.632816,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }}
      title="Centro Acadêmico"
      />
      <MapView.Marker
      coordinate={{
        latitude: -23.528951,
        longitude: -46.633147,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }}
      title="Etesp"
      />

      // variable marker
      <MapView.Marker
      coordinate= { secretaria }
      title= markerTitle
      description= markerDescription
      color= markerColor
      />
      </MapView>

      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
      >
      <View style={{marginTop: 22}}>
      <View style= {styles.modal}>
      <ScrollView>
      <Text style= {styles.text}>Scroll me plz {"\n"}
      If you like</Text>
      <Text style= {styles.link}>React Native</Text>
      <Text style= {styles.subtitulo}>SALAS ESPECIAIS</Text>
      </ScrollView>

      <Button
      onPress={() => {this.setModalVisible(!this.state.modalVisible)} }
      title="Fechar"
      color="#841584"
      />
      </View>
      </View>
      </Modal>

      <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.setModalVisible(true)}>
      </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  },
  modal:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: 'black',
    fontSize: 30,
  },
  link:{
    color: 'blue',
    fontSize: 30,
  },
  subtitulo:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  }
})
