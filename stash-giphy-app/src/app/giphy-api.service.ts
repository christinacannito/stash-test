import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GiphyApiService {
  apiKey = 'TzPDDmLNeHPtLo29ejVY6oOQEZxMHI1l';
  giphyRequest = 'http://api.giphy.com/v1/gifs/search?q=';
  giphyBaseUrl = 'http://api.giphy.com/';
  giphyRandom = 'v1/gifs/random';
  fullRequestUrl = this.giphyRequest + this.apiKey;
  userRequest = '';
  randomRequest = '';
  results;
  randomResult;

  constructor(private http: HttpClient) {

  }

  giphCall = (keyWord: string) => {
    this.userRequest = this.giphyRequest + keyWord + '&api_key=' + this.apiKey;
    this.results = this.http.get(this.userRequest).subscribe(function(data) { 
      console.log('data: ', data); 
    });
    console.log('this results in api call: ', this.results);

    let self = this;

    return new Promise((resolve, reject) => {
      self.http.get(this.userRequest).subscribe(function(data) {
        resolve(data)
      })
    });
  }

  random = () => {
    // /v1/gifs/random -> end point
    this.randomRequest = this.giphyBaseUrl + this.giphyRandom + '?api_key=' + this.apiKey;
    this.randomResult = this.http.get(this.randomRequest).subscribe(function(data) { 
      console.log('data: ', data); 
    });
    console.log('this random in api call: ', this.randomResult);

    let self = this;

    return new Promise((resolve, reject) => {
      self.http.get(this.randomRequest).subscribe(function(data) {
        resolve(data)
      })
    });
  }

  displayResults = () => {
    return this.results;
  }
}
