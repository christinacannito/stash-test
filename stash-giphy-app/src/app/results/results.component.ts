import { Component, OnInit } from '@angular/core';
import { GiphyApiService } from '../giphy-api.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
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
    this.results = this.gifservice.giphCall(this.searchWord);
    console.log('this.results in submit: ', this.results);
    return this.results;
  }
}
