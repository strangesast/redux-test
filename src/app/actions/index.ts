import { Action } from '@ngrx/store';
import * as Models from '../models';

export const UPDATED = 'UPDATED';
export const CREATED = 'CREATED';
export const SAVE =    'SAVE';
export const SAVED =   'SAVED';

export class Create implements Action {
  readonly type = CREATED;

  constructor(public payload: Models.IdObject, public timestamp: number = Date.now()) {}
}

export class Update implements Action {
  readonly type = UPDATED;

  constructor(public payload: Models.IdObject, public timestamp: number = Date.now()) {}
}

export class Save implements Action {
  readonly type = SAVE;

  constructor(public payload: Models.IdObject, public timestamp: number = Date.now()) {}
}

export class Saved implements Action {
  readonly type = SAVED;

  constructor(public payload: Models.IdObject, public timestamp: number = Date.now()) {}
}

export type All = Create | Save | Saved;
