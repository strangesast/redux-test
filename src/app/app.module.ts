import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducers, initialState } from './reducers';
import { AppEffectsModule } from './app-effects.module';

import { StoreService } from './services/store.service';
import { AppComponent } from './components/app.component';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    AppEffectsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
