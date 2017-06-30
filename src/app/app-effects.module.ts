import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { EntriesEffects } from './effects';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      EntriesEffects
    ])
  ]
})
export class AppEffectsModule {}
