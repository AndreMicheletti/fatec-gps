import React from 'react';
import { View, ListView, Text, LayoutAnimation } from 'react-native';
import Building from './Building';

import classrooms from '../data/classrooms.json';

class ClassroomsList extends React.Component {

  state = {
    dataSource: null,
    expandedId: -1
  }

  componentWillMount() {
    this.setState({ dataSource: this.createDataSource() });
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  createDataSource() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return ds.cloneWithRows(classrooms);
  }

  expandSection(id) {
    this.setState({
      expandedId: id,
      dataSource: this.createDataSource()
    });
  }

  renderRow(building) {
    return (
      <Building
        data={building}
        expanded={this.state.expandedId == building.id}
        onPress={(() => this.expandSection(building.id)).bind(this)}
      />
    );
  }

  render() {
    const { wrapperStyle } = styles;
    return (
      <View style={wrapperStyle}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  wrapperStyle: {
    paddingTop: 10, paddingBottom: 10,
    paddingLeft: 8, paddingRight: 8,
    flex: 1
  }
}

export default ClassroomsList;
