import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  allFavorites;
  localStorageKey = 'favoriteGifs';

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.showFavoriteItems();
  }

  showFavoriteItems = () => {
    // returns what was in local storage
    this.allFavorites = this.storage.get(this.localStorageKey)
    console.log('all favorites: ', this.allFavorites)
    return this.allFavorites;
  }

  deleteFavorite = (favoriteObject: object) => {
    // favoriteObject is stored in an array 
    // do index of and then remove that index from the array
    let indexFavorite = this.allFavorites.indexOf(favoriteObject)
    console.log('found index of favorite: ', indexFavorite)
    console.log('his.allFavorites[indexFavorite]: ', this.allFavorites[indexFavorite])
    // reset the array 
    this.allFavorites.splice(indexFavorite, 1)
    this.storage.set(this.localStorageKey, this.allFavorites); // you have to reset localstorage or it save the information
    let deletedSign = document.getElementById('deleted');
    deletedSign.classList.add('active')
    setTimeout(function() {
      deletedSign.classList.remove('active')
    }, 1000)
    return  this.allFavorites;
    // this.storage.remove(this.localStorageKey) // remove the individual item
    // localStorage.removeItem(this.allFavorites[indexFavorite]);
  }

}
