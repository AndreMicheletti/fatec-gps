import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const fatecRegion = {
  latitude: -23.529202,
  longitude: -46.632795,
  latitudeDelta: 0.002,
  longitudeDelta: 0.002,
}

export default class App extends Component<{}> {

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
              title='Prédio A/B - Bloco B'
            />
            <MapView.Marker
              coordinate={{
                latitude: -23.529145,
                longitude: -46.632323,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
              title='Prédio A/B - Bloco B'
            />
            <MapView.Marker
              coordinate={{
                latitude: -23.529987,
                longitude: -46.632485,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
              title='Edificio Santhiago'
            />
            <MapView.Marker
              coordinate={{
                latitude: -23.530069,
                longitude: -46.632816,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
              title='Centro Acadêmico'
            />
            <MapView.Marker
              coordinate={{
                latitude: -23.528951,
                longitude: -46.633147,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
              title='Etesp'
            />
            <MapView.Marker
              coordinate={{
                latitude: -23.529546,
                longitude: -46.632362,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
              title='Etesp'
            />
          </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  }
})
