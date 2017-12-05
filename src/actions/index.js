export const selectBuilding = (id) => {
  return {
    type: "select_building",
    payload: id
  };
};
