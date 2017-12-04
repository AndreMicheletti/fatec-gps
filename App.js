import React from 'react';
import ActionButton from 'react-native-action-button';
import { Constants, Location, Permissions, MapView } from 'expo';
import {
   BackHandler,
   Modal,
   Text,
   View,
   StyleSheet,
   Platform,
   Dimensions
 } from 'react-native';

// Component imports
import ModalContents from './src/components/ModalContents';
import NavigationBar from './src/components/NavigationBar';

// Data imports
import mapSettings from './src/data/mapSettings.js';
import markersList from './src/data/markers.json';
import routesList from './src/data/routes.json';

// Style imports
import googleMapStyle from './src/styles/mapStyle.json';

// Helper imports
import { getDistanceFromLatLonInKm } from './src/gpsHelper';

// FATEC REGION CONSTANT: map is centered in this position
const fatecRegion = {
  latitude: -23.529202,
  longitude: -46.632795,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}

var { height, width } = Dimensions.get('window');

export default class App extends React.Component<{}> {

  /*
    CLASS VARIABLES and STATE
  */

  _markers = new Array(markersList.lenght)

  sphereImage = require('./assets/sphere.png');
  colors = {
    red: "#A60000",
    blue: "#3D9AD1",
    route: "#1184d6"
  }

  state = {
    modalVisible: false, // is modal visible?
    origin: null, // selected origin (marker id)
    destiny: null, // selected destination (marker id)
    route: null, // calculated route (route id)
    userLocation: null, // current user location (coordinates)
    nearest: null // nearest marker to user position
  }

  /*
    LIFECYCLE METHODS
  */

  componentWillMount() {
    BackHandler.addEventListener('resetSelection', this.onBackPressed.bind(this));
    if (Platform.OS === 'android' && !Constants.isDevice) {
      console.log('This will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      setInterval(this._getLocationAsync.bind(this), 1500);
      // this._getLocationAsync();
    }
  }

  /*
    HELPER METHODS :: OVERALL
  */

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

  /*
    HELPER METHODS :: ROUTE
  */

  renderRoute() {
    if (this.state.route !== null) {
      let routeObject = routesList[this.state.route];
      let points = routeObject.points.map((point) => markersList[point-1].coords);
      return (
        <MapView.Polyline
          coordinates={points}
          strokeColor={this.colors.route}
          strokeWidth={4}
        />
      )}
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

  /*
    HELPER METHODS :: MARKERS
  */

  renderMarkers() {
    const { origin, destiny } = this.state;
    return markersList.map((point) => {
      if (point.visible) {
        let pinColor = (origin === point.id || destiny === point.id) ?
                        this.colors.blue : this.colors.red;
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

  /*
    HELPER METHODS :: USER LOCATION
  */

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        this.setState({ userLocation: null });
      } else {
        let location = await Location.getCurrentPositionAsync({});
        if (location !== this.state.location) {
          this.setState({
            userLocation: location.coords,
            nearest: this.getNearestMarker(location.coords)
          });
        }
      }
    } catch (e) {
      console.log('Permission to access location thrown an error');
      // console.log(e.stack)
      this.setState({ userLocation: null });
    }
  };

  renderUserLocation() {
      if (this.state.userLocation !== null) {
        return <MapView.Marker coordinate={this.state.userLocation} title='Voce está aqui' image={this.sphereImage} />;
      } else {
        return null;
      }
  }

  renderUserLocationMessage() {
    const { userLocation, nearest } = this.state;
    if (this.state.userLocation !== null) {
      return (<Text>{this.distanceBasedText(nearest.distance)}{nearest.title}</Text>);
    } else {
      return (<Text>Seu GPS não está ativado.</Text>);
    }
  }

  distanceBasedText(distanceInKm) {
    if (distanceInKm > 0.8) {
      return "Você está mais próximo do(a) ";
    } else if (distanceInKm >= 0.4) {
      return "Você está próximo do(a) ";
    } else {
      return "Você está no(a) ";
    }
  }

  getNearestMarker(pos) {
    let { latitude, longitude } = pos;
    let nearest = {
      id: null,
      title: '',
      distance: 9999
    };
    markersList.filter((point) => point.visible).forEach((point) => {
      let distance = getDistanceFromLatLonInKm(latitude, longitude, point.coords.latitude, point.coords.longitude);
      if (distance < nearest.distance) {
        nearest = { id: point.id, title: point.title, distance: distance };
      }
    });
    return nearest;
  }

  /*
    MAIN METHOD :: RENDER
  */

  render() {
    const { mapStyle, topViewStyle, menuItem } = styles;

    return (
      <View style={{ flex: 1 }}>

        <MapView
          {...mapSettings}
          style={mapStyle}
          initialRegion={fatecRegion}
          region={fatecRegion}
          customMapStyle={googleMapStyle}
        >
            {this.renderMarkers()}
            {this.renderUserLocation()}
            {this.renderRoute()}
        </MapView>

        <NavigationBar locationList={markersList} onStateChange={this.onSelectionChange.bind(this)}  />

        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
        >
          <ModalContents
            headerText={"Legenda - Encontre sua sala"}
            onButtonPress={() => this.setModalVisible(!this.state.modalVisible)}
            onLinkPress={(target) => {
              this.onSelectionChange({ origin: target, destiny: this.state.destiny });
              this.setState({ modalVisible: false });
            }}
          />
        </Modal>

        <View style={styles.bottomViewStyle}>
          {this.renderUserLocationMessage()}
        </View>
        <ActionButton
          offsetY={80}
          buttonColor="#03406A"
          onPress={() => this.setModalVisible(true) }
          icon={<Text style={menuItem}>{"?"}</Text>}
        />
      </View>
    );
  }
}

/*
  STYLES
*/

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  },
  bottomViewStyle: {
    position: 'absolute', bottom: 0,
    width: width,
    marginBottom: 32,
    paddingBottom: 8, paddingTop: 8, paddingLeft: 10, paddingRight: 10,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 2,
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
