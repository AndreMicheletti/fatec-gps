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
import LocationMarker from './components/LocationMarker'

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

  defaultPinColor = "#E74C3C"
  selectedPinColor = "#03406A"
  routeStrokeColor = "#009D91"

  state = {
    modalVisible: false,
    origin: null,
    destiny: null,
    route: null
  }

  _markers = new Array(markersList.lenght)

  componentWillMount() {
    BackHandler.addEventListener('resetSelection', this.onBackPressed.bind(this));
  }

  onBackPressed() {
    if (this) {
      if (this.state.route) {
        this.setState({ route: null });
        return true;
      } else if (this.state.origin || this.state.destiny) {
        this.setState({ origin: null, destiny: null });
        return true;
      }
    }
    return false;
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  findRouteFor(pointOne, pointTwo) {
    if (pointOne === pointTwo) {
      return null;
    }
    let foundRoute = null;
    routesList.forEach( (item, index) => {
      if (item["routeFrom"].includes(pointOne) && item.routeFrom.includes(pointTwo)) {
        foundRoute = parseInt(item["id"]) - 1;
      }
    });
    return foundRoute;
  }

  onSelectionChange(newState) {
    const { origin, destiny } = newState;
    if (origin && origin != this.state.origin && this._markers[origin]) {
      // Show Marker callout on origin if origin was changed
      this._markers[origin].showCallout();
    } else if (destiny && destiny != this.state.destiny && this._markers[destiny]) {
      // Show Marker callout on destiny if destiny was changed
      this._markers[destiny].showCallout();
    }
    this.setState({ origin, destiny, route: this.findRouteFor(origin, destiny) });
  }

  renderRoute() {
    if (this.state.route !== null) {
      let routeObject = routesList[this.state.route];
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
        let pinColor = (this.state.origin === point.id || this.state.destiny === point.id) ?
                        this.selectedPinColor : this.defaultPinColor;
        // let callout = (this.state.origin === point.id) ? { ref: (ref) => ref.showCallout() } : null
        return (
          <MapView.Marker
            ref={(ref) => {
              if (!this._markers[point.id]) {
                this._markers[point.id] = ref;
              }
            }}
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
    const { mapStyle, topViewStyle, menuItem } = styles;

    return (
      <View style={{ flex: 1 }}>

        <MapView
          {...mapSettings}
          style={mapStyle}
          initialRegion={fatecRegion}
          region={fatecRegion}>
            <LocationMarker />
            {/* Render Markers */}
            {this.renderMarkers()}
            {this.renderRoute()}
        </MapView>

        <NavigationBar
          locationList={markersList}
          onStateChange={this.onSelectionChange.bind(this)}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}>

          <ModalContents
            headerText={"Legenda - Encontre sua sala"}
            onButtonPress={() => this.setModalVisible(!this.state.modalVisible)}
            onLinkPress={(target) => {
              this.onSelectionChange({ origin: target, destiny: this.state.destiny });
              this.setState({ modalVisible: false });
            }}
          />
        </Modal>


        <ActionButton buttonColor="#e74c3c">
          <ActionButton.Item buttonColor="#03406A" title="Legenda" onPress={() => this.setModalVisible(true) }>
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
