import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResultsComponent } from './results/results.component';
import { SearchDirective } from './search/search.directive';
import { GiphyApiService } from './giphy-api.service';
import { NavigationComponent } from './navigation/navigation.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    ResultsComponent,
    SearchDirective,
    NavigationComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule
  ],
  providers: [GiphyApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
