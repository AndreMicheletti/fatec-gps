import React, { Component } from 'react';
import { Modal, Text, Button, View, StyleSheet, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button'; // https://github.com/mastermoo/react-native-action-button

import TextLink from './components/TextLink'
import interestPoints from './data/markers'

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
    showMarkers: 'mainMarkers'
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  showMaker(makerName) {
    this.setState({ showMarkers: makerName, modalVisible: false })
  }

  renderMarkers() {
    return interestPoints[this.state.showMarkers].map((point) => {
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
          showsPointsOfInterest={false}
          scrollEnabled={false}
          rotateEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          minZoomLevel={15}
          moveOnMarkerPress={false}
          cacheEnabled>
            {/* Render Markers */}
            {this.renderMarkers()}
        </MapView>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>

          <View style={{marginTop: 22}}>
            <View style= {styles.modal}>
              <ScrollView>
                <Text style= {styles.subtitulo}>Legenda</Text>
                <TextLink text='click me' onPress={() => this.showMaker('edificio') } />
              </ScrollView>

              <Button
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                style={styles.closeButtonStyle}
                title="Fechar"
                color="#e74c3c"
              />
            </View>
          </View>
        </Modal>

        <ActionButton buttonColor="#e74c3c">
          <ActionButton.Item buttonColor="#03406A" title="Legenda" onPress={() => this.setModalVisible(true) }>
            <Text style={styles.menuItem}>{"?"}</Text>
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#1D7373" title="Mostrar Todos" onPress={() => this.showMaker('mainMarkers') }>
            <Text style={styles.menuItem}>{"!"}</Text>
          </ActionButton.Item>
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
    flexDirection: 'column',
  },
  subtitulo:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  closeButtonStyle: {
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
  },
  menuItem: {
    fontSize: 28,
    fontWeight: "400",
    color: 'white'
  }
})
