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
  results = null;
  searchWord;
  todoItem = '';
  allFavorites;
  randomGifObject;
  showResults: boolean = false;
  localStorageKey = 'favoriteGifs';

  constructor(private gifservice: GiphyApiService, @Inject(SESSION_STORAGE) private storage: StorageService) { }

  public addToFavorites(favoriteGifObject: object): void {
    const favoriteGif = this.storage.get(this.localStorageKey) || [];
    let found: boolean = false;
    for(let i = 0; i < favoriteGif.length; i++) {
      if(favoriteGif[i]['id'] === favoriteGifObject['id']){
        found = true;
      }
    }

    if(found === false){
      favoriteGif.push(favoriteGifObject);
      this.storage.set(this.localStorageKey, favoriteGif);
      document.getElementById(favoriteGifObject['id'] + 'added').classList.add('activeAdd')
      document.getElementById(favoriteGifObject['id'] + 'remove').classList.add('activeAdd')
    }
  }

  ngOnInit = () => {
    let self = this;
    this.gifservice.random().then(function(randomGif) {
      return self.randomGifObject = randomGif;
    })
  }

  deleteFromLocalStorage = () => {
    this.storage.remove(this.localStorageKey)
  }

  submit = () => {
    let self = this;
    let resultsLeft = document.getElementById('resultsLeft');
    let resultsRight = document.getElementById('resultsRight');
    let resultsContainer = document.getElementById('resultsContainer')
    this.gifservice.giphCall(this.searchWord).then(function(data){
      self.results = data['data']
      
      resultsLeft.classList.add('active')
      resultsRight.classList.add('active')
      resultsLeft.classList.remove('reset')
      resultsRight.classList.remove('reset')
      resultsContainer.classList.add('active')
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

    resultsLeft.classList.add('reset');
    resultsRight.classList.add('reset');
    this.results = null;
  }
}
