import React from 'react';
import { Constants, Location, Permissions } from 'expo';
import {
   BackHandler,
   Modal,
   Text,
   Button,
   View,
   StyleSheet,
   Platform,
   Image
 } from 'react-native';

import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';

import ModalContents from './components/ModalContents'
import NavigationBar from './components/NavigationBar'

import mapSettings from './data/mapSettings.js'
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
  routeStrokeColor = "#009D91"

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

  selectLocation(pointOne) {
    this.setState({ route: null, selected: pointOne });
    const pointTwo = this.state.selected;

    if (pointTwo !== null) {
      // IF SAME SELECTED
      if (pointTwo == pointOne) {
        this.setState({ route: null, selected: null, modalVisible: false });
        return;
      }
      // LOOK FOR ROUTE
      let route = this.findRouteFor(pointTwo, pointOne);
      if (route !== null) {
        this.setState({ route: [route, pointOne, pointTwo], selected: null, modalVisible: false });
      } else {
        console.log("route not found for " + pointTwo + " " + pointOne)
      }
    } else {
      // FIRST TIME SELECTING
      this.setState({ selected: pointOne });
    }
  }

  renderRoute() {
    if (this.state.route !== null) {
      let routeObject = routesList[this.state.route[0]];
      let points = routeObject.points.map((point) => markersList[point-1].coords);
      return (
        <MapView.Polyline
          coordinates={points}
          strokeColor={this.routeStrokeColor}
          strokeWidth={3}
        />
      );
    }
  }

  renderMarkers() {
    return markersList.map((point) => {
      if (point.visible) {
        let pinColor = this.defaultPinColor;
        if (this.state.route !== null) {
          if (this.state.route[1] === point.id || this.state.route[2] === point.id) {
            pinColor = this.selectedPinColor;
          }
        }
        return (
          <MapView.Marker
            key={point.id}
            coordinate={point.coords}
            title={point.title}
            pinColor={pinColor}
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
          {...mapSettings}
          style={mapStyle}
          initialRegion={fatecRegion}
          region={fatecRegion}>

            {/* Render Markers */}
            {this.renderMarkers()}
            {this.renderRoute()}
        </MapView>

        <NavigationBar locationList={markersList} />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>

          <ModalContents
            headerText={this.state.selected === null ? "Escolha o seu local atual " : "Escolha para onde quer ir"}
            onButtonPress={() => this.setModalVisible(!this.state.modalVisible)}
            onLinkPress={this.selectLocation.bind(this)}
            selected={this.state.selected}
          />
        </Modal>


        <ActionButton buttonColor="#e74c3c">
          <ActionButton.Item buttonColor="#03406A" title="Encontrar" onPress={() => this.setModalVisible(true) }>
            <Text style={menuItem}>{"?"}</Text>
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
