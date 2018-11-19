import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  allFavorites = [];
  localStorageKey = 'favoriteGifs';

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.showFavoriteItems();
  }

  showFavoriteItems = () => {
    this.allFavorites = this.storage.get(this.localStorageKey)
    if (this.allFavorites === null) {
      this.allFavorites = [];
      return [];
    }
    return this.allFavorites;
  }

  deleteFavorite = (favoriteObject: object) => {
    let indexFavorite = this.allFavorites.indexOf(favoriteObject)
    this.allFavorites.splice(indexFavorite, 1)
    this.storage.set(this.localStorageKey, this.allFavorites);
    return  this.allFavorites;
  }

}
