import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';
import * as Models from '../models';
import * as IndexActions from '../actions';
import * as uuid from 'uuid/v4';

@Injectable()
export class EntriesEffects {
  constructor(private action$: Actions, private store: StoreService) {}

  changes$: Observable<IndexActions.Update|IndexActions.Create> = Observable.merge(this.action$.ofType(IndexActions.UPDATED), this.action$.ofType(IndexActions.CREATED)).share();

  //save$: Observable<Action> = this.changes$.window(this.changes$.debounceTime(1000)).flatMap(stream => {
  //  return stream.reduce((a, { type, payload }) => {
  //    if (type == 'CREATED') {
  //      return a.concat(payload);
  //    } else {
  //      let existing = a.find(({ _id }) => payload._id);
  //    }
  //  }, []);
  //}).map(res => {

  //});

  @Effect()
  addToIndex$: Observable<Action> = this.action$
    .ofType(IndexActions.CREATED)
    .map((action: IndexActions.Create) => action.payload)
    .switchMap(obj => {
      console.log('obj', obj);
      let collectionName = obj.constructor.name.toLowerCase() + 's';
      if (this.store.tables.map(t => t.name).indexOf(collectionName) == -1) throw new Error('invalid object');

      return this.store[collectionName].add(Object.assign({}, obj, { _id: uuid() }));
    })
    .map(res => {
      console.log('add returned', res);
      return new IndexActions.Saved(res);
    });
}
