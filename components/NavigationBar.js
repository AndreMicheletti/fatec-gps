import React from 'react';
import { View, Dimensions } from 'react-native';
import { PickerInput } from './common'


var { height, width } = Dimensions.get('window');


export default class NavigationBar extends React.Component {

  state = {
    origin: null,
    destiny: null
  }

  getLocationList(excluding) {
    return this.props.locationList.map((location) => {
      if (location.id !== excluding && location.visible == true) {
        return { label: location.title, value: location.id};
      } else {
        return false;
      }
    }).filter(x => !!x);;
  }

  render() {
    const { floatView, boxView, inputStyle } = styles;
    const { origin, destiny } = this.state;

    return (
      <View style={floatView}>
        <View style={boxView}>
          <PickerInput
            label="Seu local"
            mode='dropdown'
            itemList={[{ label: 'Onde você está?', value: 'default' }, ...this.getLocationList(destiny)]}
            onValueChange={(itemValue, itemIndex) => this.setState({ origin: itemValue })}
          />
          <PickerInput
            label="Destino"
            mode='dropdown'
            itemList={[{ label: 'Para onde vai?', value: 'default' }, ...this.getLocationList(origin)]}
            onValueChange={(itemValue, itemIndex) => this.setState({ destiny: itemValue })}
          />
        </View>
      </View>
    );
  }
}

NavigationBar.defaultProps = {
  locationList: [],
  onRouteChange: (() => console.log('route changed!'))
};

const styles = {
  floatView: {
    position: 'absolute',
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  boxView: {
    backgroundColor: 'white',
    paddingLeft: 10, paddingRight: 10,
    paddingTop: 5, paddingBottom: 5,
    width: width,
  },
  inputStyle: {
    backgroundColor: "#EAEAEA",
  }
};
