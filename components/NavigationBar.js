import React from 'react';
import { View, Dimensions } from 'react-native';
import { PickerInput } from './common'


var { height, width } = Dimensions.get('window');


export default class NavigationBar extends React.Component {

  state = {
    origin: null,
    destiny: null
  }

  onValueChange(newState) {
    this.props.onStateChange(newState);
    this.setState(newState);
  }

  getLocationList() {
    return this.props.locationList.map((location) => {
      if (location.visible == true) {
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
            itemList={[{ label: 'Onde você está?', value: 'default' }, ...this.getLocationList()]}
            onValueChange={(itemValue, itemIndex) => this.onValueChange({ origin: itemValue, destiny: destiny })}
            selectedValue={origin}
          />
          <PickerInput
            label="Destino"
            mode='dropdown'
            itemList={[{ label: 'Para onde vai?', value: 'default' }, ...this.getLocationList()]}
            onValueChange={(itemValue, itemIndex) => this.onValueChange({ origin: origin, destiny: itemValue })}
            selectedValue={destiny}
          />
        </View>
      </View>
    );
  }
}

NavigationBar.defaultProps = {
  locationList: [],
  onStateChange: ((state) => console.log('state changed!')),
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
    backgroundColor: "#F4F4F4",
  }
};
