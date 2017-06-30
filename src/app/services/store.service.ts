import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Dexie from 'dexie';
import * as uuid from 'uuid/v4';

import * as reducers from '../reducers';
import * as Models from '../models';
import * as Actions from '../actions';


@Injectable()
export class StoreService extends Dexie {
  components: Dexie.Table<Models.Component, string>;
  componentinstances: Dexie.Table<Models.ComponentInstance, string>;
  folders: Dexie.Table<Models.Folder, string>;
  projects: Dexie.Table<Models.Project, string>;

  constructor(private store: Store<reducers.State>) {
    super('store');

    this.version(1).stores({
      components:         '_id, &shortname, folder, *components',
      componentinstances: '_id, &shortname, folder, component',
      folders:            '_id, &shortname, folder',
      projects:           '_id, &shortname',
    });

    this.components.mapToClass(Models.Component);
    this.componentinstances.mapToClass(Models.ComponentInstance);
    this.folders.mapToClass(Models.Folder);
    this.projects.mapToClass(Models.Project);
  }

  createFolder(name: string, shortname?: string, description?: string) {
    shortname = shortname || name.replace(/\s/g, '_').replace(/[^\w-_]/g, '').toLowerCase();
    if (/[\s]/.test(shortname) || shortname.length < 4) {
      throw new Error('invald shortname');
    }
    let folder = new Models.Folder({ name, shortname, description });
    this.store.dispatch(new Actions.Create(folder));

    return folder;
  }

  async isValid(obj) {
    let collectionName = obj.constructor.name.toLowerCase() + 's';
    if (this.tables.map(t => t.name).indexOf(collectionName) == -1) {
      throw new Error('not a recognized constructor');
    }
    let res = await this[collectionName]
      .where('shortname')
      .equals(obj.shortname)
      .or('_id')
      .equals(obj._id)
      .first();
    return !res;
  }
}
