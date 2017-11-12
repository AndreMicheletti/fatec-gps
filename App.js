import React from 'react';
import {
   BackHandler, Modal, Text, Button, View, StyleSheet, Platform, Image
 } from 'react-native';
 import { Constants, Location, Permissions } from 'expo';

import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button'; // https://github.com/mastermoo/react-native-action-button

import ModalContents from './components/ModalContents'
import TopMessage from './components/TopMessage'

import markersList from './data/markers.json'
import routesList from './data/routes.json'


const fatecRegion = {
  latitude: -23.529202,
  longitude: -46.632795,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}

export default class App extends React.Component<{}> {

  // Modal
  state = {
    modalVisible: false,
    selected: null,
    route: null
  }

  defaultPinColor = "#E74C3C"
  selectedPinColor = "#03406A"

  componentWillMount() {
    BackHandler.addEventListener('resetSelection', this.onBackPressed.bind(this));
  }

  onBackPressed() {
    if (this) {
      if (this.state.route) {
        this.setState({ route: null });
        return true;
      } else if (this.state.selected) {
        this.setState({ selected: null });
        return true;
      }
    }
    return false;
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  findRouteFor(pointOne, pointTwo) {
    let foundRoute = null;
    routesList.forEach( (item, index) => {
      if (item["routeFrom"].includes(parseInt(pointOne)) && item.routeFrom.includes(parseInt(pointTwo))) {
        foundRoute = parseInt(item["id"]) - 1;
      }
    });
    return foundRoute;
  }

  onMarkerPressed(pointId) {
    if (this.state.route) {
      this.setState({ route: null, selected: pointId });
    } else {
      if (this.state.selected !== null) {
        let route = this.findRouteFor(this.state.selected, pointId);
        if (route !== null) {
          this.setState({ route: route, selected: null });
        } else {
          console.log("route not found for " + this.state.selected + " " + pointId)
        }
      } else {
        this.setState({ selected: pointId });
      }
    }
  }

  renderRoute() {
    if (this.state.route !== null) {
      let routeObject = routesList[this.state.route];
      let points = routeObject.points.map((point) => markersList[point-1].coords);
      return (
        <MapView.Polyline
          coordinates={points}
          strokeWidth={2}
          strokeColor={this.selectedPinColor}
        />
      );
    }
  }

  renderMarkers() {
    return markersList.map((point) => {
      if (point.visible) {
        return (
          <MapView.Marker
            key={point.id}
            onPress={(e) => this.onMarkerPressed(point.id)}
            coordinate={point.coords}
            title={point.title}
            pinColor={(this.state.selected == point.id ? this.selectedPinColor : this.defaultPinColor)}
          />
        );
      }
    });
  }


  render() {
    const {mapStyle, topViewStyle, menuItem} = styles;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider="google"
          style={mapStyle}
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
            {this.renderRoute()}
        </MapView>

        <TopMessage text="Onde você está?" />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>

          <ModalContents
            onButtonPress={() => this.setModalVisible(!this.state.modalVisible)}
            showMaker={() => null}
          />
        </Modal>


        <ActionButton buttonColor="#e74c3c">
          <ActionButton.Item buttonColor="#03406A" title="Legenda" onPress={() => this.setModalVisible(true) }>
            <Text style={menuItem}>{"?"}</Text>
          </ActionButton.Item>
          {/* <ActionButton.Item buttonColor="#1D7373" title="Mostrar Todos" onPress={() => this.showMaker('mainMarkers') }>
            <Text style={menuItem}>{"#"}</Text>
          </ActionButton.Item> */}
        </ActionButton>
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
    height: 500,
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
