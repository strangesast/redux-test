import * as Models from '../models';
import * as Actions from '../actions';

const initialState: State = {
  folders: [],
  components: [],
  componentinstances: [],
  projects: []
}

export interface State {
  folders:            Models.Folder[],
  components:         Models.Component[], componentinstances: Models.ComponentInstance[],
  projects:           Models.Project[]
}

export function reducer (state = initialState, action: Actions.All): State {
  let { type, payload } = action;
  console.log('action', action);
  switch (type) {
    case Actions.CREATED: {
      let cat = payload.constructor.name.toLowerCase() + 's';
      if (Object.keys(state).indexOf(cat) == -1) throw new Error('invalid payload');

      return Object.assign({}, state, { [cat]: state[cat].concat(payload) });
    }
    case Actions.SAVE: {
    }
    case Actions.SAVED: {
    }
    default: {
      return state;
    }
  }
}

export function getFolders (state: State) {
  return state.folders;
}
