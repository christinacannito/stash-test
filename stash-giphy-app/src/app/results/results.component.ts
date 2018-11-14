import { Component, OnInit } from '@angular/core';
import { GiphyApiService } from '../giphy-api.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  resultKeys = Object.keys;
  results;
  searchWord;

  constructor(private gifservice: GiphyApiService) { }

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
