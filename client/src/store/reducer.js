import { updateObject } from "../../shared/utility";

const initialState = {
  expanded: null
};

handleChange = panel => (event, expanded) => updateObject(state.expanded, expanded ? panel : false);
