import { Component, OnInit, Inject, Injectable  } from '@angular/core';
import { GiphyApiService } from '../giphy-api.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
@Injectable()
export class ResultsComponent implements OnInit {
  resultKeys = Object.keys;
  results;
  searchWord;
  todoItem = '';
  allFavorites;
  localStorageKey = 'favoriteGifs';

  constructor(private gifservice: GiphyApiService, @Inject(SESSION_STORAGE) private storage: StorageService) { }

  public addToFavorites(favoriteGifObject: object): void {
    //get array of tasks from local storage
    const favoriteGif = this.storage.get(this.localStorageKey) || [];
    // push new task to array
    // favoriteGif.push({
    //    title: taskTitle
    // });
    favoriteGif.push(favoriteGifObject)
    // insert updated array to local storage
    this.storage.set(this.localStorageKey, favoriteGif);
    console.log(this.storage.get(this.localStorageKey) || 'LocaL storage is empty');
  }

  showFavoriteItems = () => {
    // returns what was in local storage
    this.allFavorites = this.storage.get(this.localStorageKey)
    console.log('all favorites: ', this.allFavorites)
    return this.allFavorites;
  }

  deleteFromLocalStorage = () => {
    this.storage.remove(this.localStorageKey) // remove the individual item
  }

  ngOnInit() {
    // on init you want to see what the user has requested
    // this.results = this.gifservice.displayResults();
    console.log('results: ', this.results);
    // the results view will have a ng if looping through the results
  }

  displayResults = () => {
    return this.results;
  }

  submit = () => {
    console.log('search word: ', this.searchWord);
    let self = this;
    this.gifservice.giphCall(this.searchWord).then(function(data){
      console.log('now in a promise, data: ', data['data']); // this is an array 
      self.results = data['data']
      console.log('zero index: ', self.results[0])
      return self.results;
    });
  }
}
