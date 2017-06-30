import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as uuid from 'uuid/v4';

import { StoreService } from '../services/store.service';
import * as reducers from '../reducers';
import * as Models from '../models';

import { Observable } from 'rxjs';
import * as Actions from '../actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  folders$: Observable<any>;

  constructor(private storeService: StoreService, private store: Store<reducers.State>) {
    this.folders$ = store.select(reducers.getFolders)
  }

  test() {
    this.storeService.createFolder('test folder');
  }
}
