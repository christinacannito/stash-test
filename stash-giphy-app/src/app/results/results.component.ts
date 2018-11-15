import { Component, OnInit, Inject, Injectable  } from '@angular/core';
import { GiphyApiService } from '../giphy-api.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { element } from '@angular/core/src/render3';


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
    // the gif already is in favorites DO NOT push again 
    console.log('favoriteGif.indexOf(favoriteGifObject): ', favoriteGif.indexOf(favoriteGifObject))
    // you might have to loop through the array and go based on id 
    console.log('favoriteGif[0] === favoriteGif[1]: ', favoriteGif[0] == favoriteGif[1])
    // let elementClicked = document.getElementById(favoriteGifObject['id']);
    // console.log('element clicked: ', elementClicked)

    // you have to do a check for local storage
    let found: boolean = false;
    for(let i = 0; i < favoriteGif.length; i++) {
      if(favoriteGif[i]['id'] === favoriteGifObject['id']){
        found = true;
      }
    }

    if(found === false){
      // now you can push
      favoriteGif.push(favoriteGifObject);
      this.storage.set(this.localStorageKey, favoriteGif);
    }
    

    // if the element has the attribute 'disabled' then don't push it to favorites again 
    // if(elementClicked.hasAttribute('disabled') === false) {
      // it has already been added to favorite so don't do that again :) 
      // elementClicked.setAttribute('disabled', 'disabled')
      // favoriteGif.push(favoriteGifObject)
      // insert updated array to local storage
      // this.storage.set(this.localStorageKey, favoriteGif);
    // }
    
    console.log(this.storage.get(this.localStorageKey) || 'LocaL storage is empty');
  }

  ngOnInit() {
    // on init you want to see what the user has requested
    // this.results = this.gifservice.displayResults();
    console.log('results: ', this.results);
    // the results view will have a ng if looping through the results
  }

  deleteFromLocalStorage = () => {
    this.storage.remove(this.localStorageKey)
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
