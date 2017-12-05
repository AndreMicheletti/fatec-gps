import React from 'react';
import { ListView } from 'react-native';
import BuildingItem from './BuildingItem';

import { connect } from 'react-redux';

class BuildingsList extends React.Component {

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.buildings);
  }

  renderRow(building) {
    return <BuildingItem building={building} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { buildings: state.buildings };
}

export default connect(mapStateToProps)(BuildingsList);
