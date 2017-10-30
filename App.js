import React, { Component } from 'react';
import { Modal, Text, Button, View, StyleSheet, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button'; // https://github.com/mastermoo/react-native-action-button

import interestPoints from './data/markers'

// marker's vars
var markerTitle = "Secretaria"
var markerDescription = ""
var markerColor = "rgb(250, 255, 0)"

const fatecRegion = {
  latitude: -23.529202,
  longitude: -46.632795,
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

  renderMarkers() {
    return interestPoints.map((point) => {
      return (
        <MapView.Marker
          key={point.title}
          coordinate={point.coords}
          title={point.title}
          subtitle={point.subtitle}
          pinColor={point.color}
        />
      );
    });
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
          showsMyLocationButton={false}>
            {/* Render Markers */}
            {this.renderMarkers()}
        </MapView>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}>

          <View style={{marginTop: 22}}>
            <View style= {styles.modal}>
              <ScrollView>
                <Text style= {styles.subtitulo}>SALAS ESPECIAIS</Text>
              </ScrollView>

              <Button
                onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
                style={styles.closeButtonStyle}
                title="Fechar"
                color="#841584"
              />
            </View>
          </View>
        </Modal>

        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.setModalVisible(true)} />
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
  subtitulo:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  closeButtonStyle: {
    padding: 5,
    borderRadius: 5
  }
})
