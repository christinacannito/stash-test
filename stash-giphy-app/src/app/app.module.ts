import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResultsComponent } from './results/results.component';
import { SearchDirective } from './search/search.directive';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    ResultsComponent,
    SearchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
