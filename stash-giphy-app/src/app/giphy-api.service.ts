import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GiphyApiService {
  apiKey = 'TzPDDmLNeHPtLo29ejVY6oOQEZxMHI1l';
  // giphyRequest = 'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=';
  giphyRequest = 'http://api.giphy.com/v1/gifs/search?q=';
  fullRequestUrl = this.giphyRequest + this.apiKey;
  userRequest = '';
  results;

  constructor(private http: HttpClient) {

  }

  giphCall = (keyWord: string) => {
    this.userRequest = this.giphyRequest + keyWord + '&api_key=' + this.apiKey;
    this.results = this.http.get(this.userRequest);
    console.log('this results in api call: ', this.results);
    return this.results;
  }

  displayResults = () => {
    return this.results;
  }
}
