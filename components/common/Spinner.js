import React from 'react'
import { View, ActivityIndicator } from 'react-native'

class Spinner extends React.Component {
  render() {
    return (
      <View style={styles.spinnerStyle}>
        <ActivityIndicator size={this.props.size} />
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

Spinner.defaultProps = {
  size: "small"
};

export { Spinner }
