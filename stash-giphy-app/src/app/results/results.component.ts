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
  randomGifObject;
  showResults: boolean = false;
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
    
    console.log(this.storage.get(this.localStorageKey) || 'LocaL storage is empty');
  }

  ngOnInit() {
    // on init you want to see what the user has requested
    // this.results = this.gifservice.displayResults();
    // console.log('results: ', this.results);
    // the results view will have a ng if looping through the results
    // generate random gif 
    let self = this;
    this.gifservice.random().then(function(randomGif) {
      console.log('random gif in results component: ', randomGif)
      return self.randomGifObject = randomGif;
    })
    // console.log('random gif object: ', this.randomGifObject)
  }

  deleteFromLocalStorage = () => {
    this.storage.remove(this.localStorageKey)
  }

  submit = () => {
    console.log('search word: ', this.searchWord);
    let self = this;
    let resultsLeft = document.getElementById('resultsLeft');
    let resultsRight = document.getElementById('resultsRight');
    let resultsContainer = document.getElementById('resultsContainer')
    this.gifservice.giphCall(this.searchWord).then(function(data){
      console.log('now in a promise, data: ', data['data']); // this is an array 
      self.results = data['data']
      console.log('zero index: ', self.results[0])
      
      // here you should add some css to hide and show the home screen form and the results
      resultsLeft.classList.add('active')
      resultsRight.classList.add('active')
      resultsContainer.classList.add('active')
      // self.showResults = true;

      // then results should go from hidden to shown

      return self.results;
    });
  }

  resetForm = () => {
    let resultsLeft = document.getElementById('resultsLeft');
    let resultsRight = document.getElementById('resultsRight');
    let resultsContainer = document.getElementById('resultsContainer')
    resultsLeft.classList.remove('active')
    resultsRight.classList.remove('active')
    resultsContainer.classList.remove('active')
  }
}
