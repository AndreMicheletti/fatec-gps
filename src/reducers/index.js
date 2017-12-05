import { combineReducers } from 'redux';

import buildings from '../data/buildings.json';

export default combineReducers({
  buildings: (() => buildings),
  selectedBuildingId: ((state = null, action) => {
    switch (action.type) {
      case 'select_building':
        return action.payload;
      default:
        return state;
    };
  })
});
