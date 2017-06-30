import { createSelector } from 'reselect';

import * as fromEntries from './entries-reducer'
import * as Models from '../models';

export interface State {
  entries: fromEntries.State
  project: Models.Project,
  HEAD
}

export const initialState: State = {
  entries: { folders: [], components: [], componentinstances: [], projects: [] },
  project: null,
  HEAD: null
}

export const reducers = {
  entries: fromEntries.reducer
};

export const getEntriesState = (state: State) => state.entries;

export const getFolders = createSelector(getEntriesState, fromEntries.getFolders);
